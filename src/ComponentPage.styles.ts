import type { CSSProperties } from 'react';

export const componentPageStyles: Record<string, CSSProperties> = {
  page: {
    position: 'sticky',
    top: 0,
    height: 'auto',
    width: '100vw',
    background: '#FFFFFF',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '200px 32px 32px',
  },
  grid: {
    width: '100%',
    maxWidth: 1200,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 24,
  },
  bigCard: {
    gridColumn: 'span 2',
    height: 400,
    borderRadius: 48,
    display: 'flex',
    overflow: 'hidden',
  },
  smallCard: {
    height: 400,
    borderRadius: 48,
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    justifyContent: 'space-between',
  },
  bigLeft: {
    flex: 1,
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBig: {
    fontSize: 32,
    fontWeight: 700,
    color: '#000000',
    marginBottom: 12,
  },
  descBig: {
    color: 'rgba(0,0,0,0.48)',
    fontSize: 16,
    lineHeight: 1.6,
    maxWidth: 280,
  },
  bigRight: {
    width: '45%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  imageFrame: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  imgBigBase: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  imgBigHover: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  smallImageWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 32,
    overflow: 'hidden',
  },
  smallImageFrame: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  smallImgBase: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  smallImgHover: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  smallTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: '#000000',
    marginBottom: 12,
    lineHeight: 1.2,
  },
  smallDesc: {
    color: 'rgba(0,0,0,0.48)',
    fontSize: 16,
    lineHeight: 1.4,
  },
};

export const componentPageCss = `
.component-card {
  background: #eeeeee;
  transition: background-color 240ms cubic-bezier(0.22, 1.61, 0.36, 1),
    box-shadow 240ms cubic-bezier(0.22, 1.61, 0.36, 1),
    transform 240ms cubic-bezier(0.22, 1.61, 0.36, 1);
}

.component-card:hover {
  background: #fafafa;
  box-shadow: 0px 24px 120px 0px rgba(0, 0, 0, 0.16);
  animation: card-pop 240ms cubic-bezier(0.22, 1.61, 0.36, 1) both;
}

.component-img-base,
.component-img-hover {
  transform: scale(1);
}

.component-img--big {
  transition: opacity 240ms cubic-bezier(0.22, 1.61, 0.36, 1),
    transform 240ms cubic-bezier(0.22, 1.61, 0.36, 1);
}

.component-img--small {
  transition: opacity 200ms cubic-bezier(0.22, 1.61, 0.36, 1),
    transform 200ms cubic-bezier(0.22, 1.61, 0.36, 1);
}

.component-img-hover {
  opacity: 0;
}

.component-card:hover .component-img-base {
  opacity: 0;
  transform: scale(1.15);
}

.component-card:hover .component-img-hover {
  opacity: 1;
  transform: scale(1.15);
}

@keyframes card-pop {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.02);
  }
}
`;
