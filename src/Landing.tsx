import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { landingStyles } from './Landing.styles';

const WALL_THICKNESS = 60;
const WORLD_WIDTH_MULTIPLIER = 1.1;
const BACKGROUND_COLOR = '#F7F6FB';
const BASE_SCREEN_WIDTH = 1728;
const BASE_CARD_SCALE = 0.5;
const BASE_COIN_SCALE = 0.5;
const COIN_SPAWN_INTERVAL = 50;
const COIN_START_DELAY = 3000;
const COIN_LIFETIME = 3000;
const COIN_FADE_TIME = 500;
const SPECIAL_CARD_KEYWORD = '高触达';

const images = import.meta.glob('./assets/images/*.png', { eager: true, import: 'default' });
const coinImageUrl = images['./assets/images/coin.png'] as string;
const cardImageUrls = Object.entries(images)
  .filter(([key]) => !key.includes('coin.png'))
  .map(([, url]) => url as string);

interface LoadedImage {
  url: string;
  img: HTMLImageElement;
}

export default function Landing() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);
  const lastSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const getContainer = () => sceneRef.current;
    const getSize = () => {
      const container = getContainer();
      return {
        width: container?.clientWidth ?? 0,
        height: container?.clientHeight ?? 0
      };
    };
    const getScaleFactor = (width?: number) => {
      const containerWidth = width ?? getSize().width;
      return containerWidth / BASE_SCREEN_WIDTH;
    };
    const setBodyScaleData = (body: Matter.Body, baseScale: number, currentScale: number) => {
      (body as any).plugin = { baseScale, currentScale };
    };

    lastSizeRef.current = getSize();

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Events = Matter.Events;

    const engine = Engine.create();
    engineRef.current = engine;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: sceneRef.current.clientHeight,
        background: BACKGROUND_COLOR,
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;
    const canvas = render.canvas;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      window.scrollBy({ top: event.deltaY });
    };
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    const createBoundaries = (width: number, height: number) => {
      const worldWidth = width * WORLD_WIDTH_MULTIPLIER;
      const offsetX = (worldWidth - width) / 2;

      const ground = Bodies.rectangle(
        width / 2,
        height + WALL_THICKNESS / 2,
        worldWidth,
        WALL_THICKNESS,
        { isStatic: true, render: { visible: false } }
      );

      const leftWall = Bodies.rectangle(
        -offsetX - WALL_THICKNESS / 2,
        height / 2,
        WALL_THICKNESS,
        height * 5,
        { isStatic: true, render: { visible: false } }
      );

      const rightWall = Bodies.rectangle(
        width + offsetX + WALL_THICKNESS / 2,
        height / 2,
        WALL_THICKNESS,
        height * 5,
        { isStatic: true, render: { visible: false } }
      );

      return [ground, leftWall, rightWall];
    };

    const initBoundaries = () => {
        if (!sceneRef.current) return;
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;
        const newWalls = createBoundaries(width, height);
        wallsRef.current = newWalls;
        Composite.add(engine.world, newWalls);
    }
    initBoundaries();

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    const runner = Runner.create();
    runnerRef.current = runner;
    Render.run(render);
    Runner.run(runner, engine);

    const spawnCards = async () => {
      const { width: containerWidth } = getSize();
      if (!containerWidth) return;
      const worldWidth = containerWidth * WORLD_WIDTH_MULTIPLIER;
      const offsetX = (worldWidth - containerWidth) / 2;

      const loadedImages: LoadedImage[] = await Promise.all(
        cardImageUrls.map(async (url) => {
          const img = new Image();
          img.src = url;
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
          return { url, img };
        })
      );

      loadedImages.sort((a, b) => {
        const isASpecial = a.url.includes(SPECIAL_CARD_KEYWORD) || decodeURIComponent(a.url).includes(SPECIAL_CARD_KEYWORD);
        const isBSpecial = b.url.includes(SPECIAL_CARD_KEYWORD) || decodeURIComponent(b.url).includes(SPECIAL_CARD_KEYWORD);
        return (isASpecial === isBSpecial) ? 0 : isASpecial ? -1 : 1;
      });

      const totalImages = loadedImages.length;
      const minX = -offsetX;
      const maxX = containerWidth + offsetX;
      const totalWidth = maxX - minX;
      const slotWidth = totalWidth / totalImages;
      const availableSlots = Array.from({ length: totalImages }, (_, i) => i);

      loadedImages.forEach(({ url, img }) => {
        if (!img.width || !img.height) return;

        const currentScale = BASE_CARD_SCALE * getScaleFactor();
        const width = img.width * currentScale;
        const height = img.height * currentScale;
        const isSpecial = url.includes(SPECIAL_CARD_KEYWORD) || decodeURIComponent(url).includes(SPECIAL_CARD_KEYWORD);

        let slotIndex: number;

        if (isSpecial) {
          const centerIndex = Math.floor(totalImages / 2);
          const candidates = [centerIndex, centerIndex - 1, centerIndex + 1]
            .filter(idx => availableSlots.includes(idx));
          
          if (candidates.length > 0) {
             const chosen = candidates[Math.floor(Math.random() * candidates.length)];
             slotIndex = chosen;
          } else {
             const randIdx = Math.floor(Math.random() * availableSlots.length);
             slotIndex = availableSlots[randIdx];
          }
        } else {
           const randIdx = Math.floor(Math.random() * availableSlots.length);
           slotIndex = availableSlots[randIdx];
        }

        const idxInAvailable = availableSlots.indexOf(slotIndex);
        if (idxInAvailable > -1) availableSlots.splice(idxInAvailable, 1);

        const slotStart = minX + slotIndex * slotWidth;
        const slotEnd = slotStart + slotWidth;
        const padding = width / 2;
        const effectiveStart = slotStart + padding;
        const effectiveEnd = slotEnd - padding;
        
        let randomX;
        if (effectiveEnd > effectiveStart) {
            randomX = Math.random() * (effectiveEnd - effectiveStart) + effectiveStart;
        } else {
            randomX = slotStart + slotWidth / 2;
        }

        const body = Bodies.rectangle(
          randomX,
          -Math.random() * 1000 - 100, 
          width,
          height,
          {
            angle: (Math.random() - 0.5) * Math.PI / 4,
            restitution: 0.4,
            friction: 0.5,
            render: {
              sprite: { texture: url, xScale: currentScale, yScale: currentScale }
            }
          }
        );
        setBodyScaleData(body, BASE_CARD_SCALE, currentScale);
        Composite.add(engine.world, body);
      });
    };

    spawnCards();

    let coinInterval: number | undefined;
    let rainTimeout: number | undefined;

    if (coinImageUrl) {
        const coinImg = new Image();
        coinImg.src = coinImageUrl;
        coinImg.onload = () => {
            const spawnCoin = () => {
                const { width: containerWidth } = getSize();
                if (!containerWidth) return;
                const coinScale = BASE_COIN_SCALE * getScaleFactor(containerWidth);
                const worldWidth = containerWidth * WORLD_WIDTH_MULTIPLIER;
                const offsetX = (worldWidth - containerWidth) / 2;
                
                const width = coinImg.width * coinScale;
                
                const minX = -offsetX + width / 2;
                const maxX = containerWidth + offsetX - width / 2;
                const randomX = Math.random() * (maxX - minX) + minX;

                const coinBody = Bodies.circle(randomX, -100, width / 2, {
                    restitution: 0.6,
                    friction: 0.1,
                    render: {
                        sprite: { texture: coinImageUrl, xScale: coinScale, yScale: coinScale },
                        opacity: 1
                    },
                    label: 'coin'
                });
                setBodyScaleData(coinBody, BASE_COIN_SCALE, coinScale);
                (coinBody as any).createdAt = Date.now();
                Composite.add(engine.world, coinBody);
            };

            rainTimeout = setTimeout(() => {
                coinInterval = setInterval(spawnCoin, COIN_SPAWN_INTERVAL);
            }, COIN_START_DELAY);
        };
    }

    Events.on(engine, 'beforeUpdate', () => {
        const bodies = Composite.allBodies(engine.world);
        const now = Date.now();
        const bodiesToRemove: Matter.Body[] = [];

        bodies.forEach(body => {
            if (body.label === 'coin' && (body as any).createdAt) {
                const age = now - (body as any).createdAt;
                if (age > COIN_LIFETIME) {
                    bodiesToRemove.push(body);
                } else if (age > COIN_LIFETIME - COIN_FADE_TIME) {
                    const fadeProgress = (age - (COIN_LIFETIME - COIN_FADE_TIME)) / COIN_FADE_TIME;
                    body.render.opacity = Math.max(0, 1 - fadeProgress);
                }
            }
        });

        if (bodiesToRemove.length > 0) {
            Composite.remove(engine.world, bodiesToRemove);
        }
    });

    const handleResize = () => {
        const { width: newWidth, height: newHeight } = getSize();
        if (!newWidth || !newHeight) return;
        Render.setSize(render, newWidth, newHeight);

        Composite.remove(engine.world, wallsRef.current);
        const newWalls = createBoundaries(newWidth, newHeight);
        wallsRef.current = newWalls;
        Composite.add(engine.world, newWalls);

        const oldWidth = lastSizeRef.current.width || newWidth;
        const oldHeight = lastSizeRef.current.height || newHeight;
        const ratio = newWidth / oldWidth;
        const nextScale = getScaleFactor(newWidth);

        Composite.allBodies(engine.world).forEach(body => {
            if (!body.isStatic) {
                const plugin = (body as any).plugin || {};
                const baseScale = plugin.baseScale ?? BASE_CARD_SCALE;
                const currentScale = plugin.currentScale ?? baseScale * nextScale;
                const targetScale = baseScale * nextScale;
                const scaleRatio = targetScale / currentScale;

                Matter.Body.scale(body, scaleRatio, scaleRatio);
                Matter.Body.setPosition(body, {
                    x: (body.position.x - oldWidth / 2) * ratio + newWidth / 2,
                    y: (body.position.y - oldHeight / 2) * ratio + newHeight / 2
                });

                if (body.render.sprite) {
                    body.render.sprite.xScale = targetScale;
                    body.render.sprite.yScale = targetScale;
                }

                setBodyScaleData(body, baseScale, targetScale);
            }
        });

        lastSizeRef.current = { width: newWidth, height: newHeight };
    };

    window.addEventListener('resize', handleResize);

    return () => {
        canvas.removeEventListener('wheel', handleWheel);
        window.removeEventListener('resize', handleResize);
        if (coinInterval) clearInterval(coinInterval);
        if (rainTimeout) clearTimeout(rainTimeout);
        
        Render.stop(render);
        Runner.stop(runner);
        if (render.canvas) render.canvas.remove();
        Composite.clear(engine.world, false);
        Engine.clear(engine);
    };
  }, []);

  return (
    <div style={landingStyles.page}>
      <div className="top-banner" style={landingStyles.banner}>
        <div style={landingStyles.bannerLogo}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.5 1.5H16C16 4.26142 18.2386 6.5 21 6.5V10C19.1311 10 17.4031 9.39686 16 8.3746V15.5C16 19.0899 13.0899 22 9.5 22C5.91015 22 3 19.0899 3 15.5C3 11.9101 5.91015 9 9.5 9C9.84007 9 10.174 9.02611 10.5 9.07645V12.6707C10.1872 12.5602 9.85064 12.5 9.5 12.5C7.84315 12.5 6.5 13.8431 6.5 15.5C6.5 17.1569 7.84315 18.5 9.5 18.5C11.1569 18.5 12.5 17.1569 12.5 15.5V1.5Z" fill="black" />
          </svg>
        </div>
        <div style={{ ...landingStyles.bannerText, ...landingStyles.bannerTextBlock, textAlign: 'left' }}>
          TIKTOK INCENTIVE <br /> UI COMPONENT
        </div>
        <div style={{ ...landingStyles.bannerText, ...landingStyles.bannerTextBlock, ...landingStyles.bannerTextRight }}>MAKE DECISION BETTER</div>
      </div>
      <div style={landingStyles.middleBanner}>
        <div style={landingStyles.middleBannerLeft}>
          65+<span style={{ opacity: 0.2 }}>built</span>
        </div>
        <div style={landingStyles.middleBannerRight}>
          <div style={landingStyles.middleBannerRightInner}>
            COMPONENTS
            <br />
            <span style={{ opacity: 0.4 }}>SYSTEM</span>
          </div>
        </div>
      </div>
      <div ref={sceneRef} style={landingStyles.scene} />
    </div>
  );
}
