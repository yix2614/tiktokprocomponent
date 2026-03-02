import { componentPageCss, componentPageStyles } from './ComponentPage.styles';

const images = {
  bigHover: new URL('./assets/images/Component/BiglCard1_Hover.png', import.meta.url).href,
  small1Hover: new URL('./assets/images/Component/smallCard1_Hover.png', import.meta.url).href,
  small2: new URL('./assets/images/Component/smallCard2.png', import.meta.url).href,
  small2Hover: new URL('./assets/images/Component/smallCard2_Hover.png', import.meta.url).href,
  small3: new URL('./assets/images/Component/smallCard3.png', import.meta.url).href,
  small3Hover: new URL('./assets/images/Component/smallCard3_Hover.png', import.meta.url).href,
  small4: new URL('./assets/images/Component/smallCard4.png', import.meta.url).href,
  small4Hover: new URL('./assets/images/Component/smallCard4_Hover.png', import.meta.url).href,
};

export default function ComponentPage() {
  return (
    <div style={componentPageStyles.page}>
      <style>{componentPageCss}</style>
      <div style={componentPageStyles.grid}>
        <div className="component-card component-card--big" data-card="bigCard1" style={componentPageStyles.bigCard}>
          <div style={componentPageStyles.bigLeft}>
            <div style={componentPageStyles.iconWrapper}>
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="47" viewBox="0 0 42 47" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.7842 0.803713C19.6404 -0.267978 21.9279 -0.267831 23.7842 0.803713L26.2383 2.22071C25.318 3.98087 26.7852 5.07129 24.5254 6.07129L21.7842 4.26758C21.1655 3.91063 20.4028 3.91044 19.7842 4.26758L5 12.8037C4.38136 13.161 4.00004 13.8217 4 14.5361V24.0088L6.82031 22.2285C8.05846 21.4466 8.67801 21.0558 9.34277 20.9033C9.93049 20.7685 10.5411 20.7679 11.1289 20.9023C11.7937 21.0545 12.4129 21.4455 13.6514 22.2266L20.1348 26.3145L21.5205 25.4541C22.7556 24.6873 23.3738 24.3041 24.0352 24.1563C24.6199 24.0256 25.2268 24.0278 25.8105 24.1631C26.4707 24.3161 27.0855 24.7042 28.3145 25.4805L37.5693 31.3252V16.0713H37.7852L37.9912 16.0664C39.6565 15.9819 41.052 14.8783 41.5693 13.3672V31.6074C41.5692 33.7507 40.4255 35.732 38.5693 36.8037L23.7842 45.3398C21.928 46.4113 19.6404 46.4114 17.7842 45.3398L3 36.8037C1.1438 35.732 0.000183184 33.7508 0 31.6074V14.5361C3.54296e-05 12.3927 1.14378 10.4117 3 9.33985L17.7842 0.803713ZM4 28.7383V31.6074L4.00488 31.7412C4.04927 32.4035 4.42013 33.005 5 33.3398L19.7842 41.876C20.4027 42.233 21.1656 42.2328 21.7842 41.876L34.8428 34.3359L24.9258 28.0713L23.5391 28.9326C22.305 29.6989 21.6873 30.0826 21.0264 30.2305C20.4421 30.3611 19.8353 30.3585 19.252 30.2236C18.5922 30.071 17.9774 29.6839 16.749 28.9092L10.2363 24.8008L4 28.7383Z"
                  fill="black"
                  fillOpacity="0.48"
                />
                <path
                  d="M31.7852 3.07129C32.3374 3.07129 32.7851 3.51904 32.7852 4.07129V9.07129H37.7852C38.3374 9.07129 38.7851 9.51904 38.7852 10.0713V12.0713C38.7851 12.6235 38.3374 13.0713 37.7852 13.0713H32.7852V18.0713C32.7851 18.6235 32.3374 19.0713 31.7852 19.0713H29.7852C29.2329 19.0713 28.7852 18.6235 28.7852 18.0713V13.0713H23.7852C23.2329 13.0713 22.7852 12.6235 22.7852 12.0713V10.0713C22.7852 9.51904 23.2329 9.07129 23.7852 9.07129H28.7852V4.07129C28.7852 3.51904 29.2329 3.07129 29.7852 3.07129H31.7852Z"
                  fill="black"
                  fillOpacity="0.48"
                />
              </svg>
            </div>
            <div>
              <h2 style={componentPageStyles.titleBig}>Task Cell</h2>
              <p style={componentPageStyles.descBig}>
                Task Card displays key task information and a CTA to guide
              </p>
            </div>
          </div>
          <div style={componentPageStyles.bigRight}>
            <div style={componentPageStyles.imageFrame}>
              <img
                src="https://drive.google.com/thumbnail?id=1Qo8PPl8SkxW7Y8hZgOw7InXcCXmTRoXi&sz=w1000"
                alt="Task UI"
                className="component-img-base component-img--big"
                style={componentPageStyles.imgBigBase}
                referrerPolicy="no-referrer"
              />
              <img
                src={images.bigHover}
                alt="Task UI Hover"
                className="component-img-hover component-img--big"
                style={componentPageStyles.imgBigHover}
              />
            </div>
          </div>
        </div>
        <div className="component-card component-card--small" data-card="smallCard1" style={componentPageStyles.smallCard}>
          <div style={componentPageStyles.smallImageWrapper}>
            <div style={componentPageStyles.smallImageFrame}>
              <img
                src="https://drive.google.com/thumbnail?id=1WbT5MQerz0_-wIp7bFfz7H485d2nRZY5&sz=w1000"
                alt="Check in UI"
                className="component-img-base component-img--small"
                style={componentPageStyles.smallImgBase}
                referrerPolicy="no-referrer"
              />
              <img
                src={images.small1Hover}
                alt="Check in UI Hover"
                className="component-img-hover component-img--small"
                style={componentPageStyles.smallImgHover}
              />
            </div>
          </div>
          <div>
            <h2 style={componentPageStyles.smallTitle}>Check in Card</h2>
            <p style={componentPageStyles.smallDesc}>
              Check in daily to earn generous rewards and unlock exclusive benefits every day.
            </p>
          </div>
        </div>
        <div className="component-card component-card--small" data-card="smallCard2" style={componentPageStyles.smallCard}>
          <div style={componentPageStyles.smallImageWrapper}>
            <div style={componentPageStyles.smallImageFrame}>
              <img
                src={images.small2}
                alt="Check in UI"
                className="component-img-base component-img--small"
                style={componentPageStyles.smallImgBase}
                referrerPolicy="no-referrer"
              />
              <img
                src={images.small2Hover}
                alt="Check in UI Hover"
                className="component-img-hover component-img--small"
                style={componentPageStyles.smallImgHover}
              />
            </div>
          </div>
          <div>
            <h2 style={componentPageStyles.smallTitle}>Toast</h2>
            <p style={componentPageStyles.smallDesc}>
              Check in daily to earn generous rewards and unlock exclusive benefits every day.
            </p>
          </div>
        </div>
        <div className="component-card component-card--small" data-card="smallCard3" style={componentPageStyles.smallCard}>
          <div style={componentPageStyles.smallImageWrapper}>
            <div style={componentPageStyles.smallImageFrame}>
              <img
                src={images.small3}
                alt="Check in UI"
                className="component-img-base component-img--small"
                style={componentPageStyles.smallImgBase}
                referrerPolicy="no-referrer"
              />
              <img
                src={images.small3Hover}
                alt="Check in UI Hover"
                className="component-img-hover component-img--small"
                style={componentPageStyles.smallImgHover}
              />
            </div>
          </div>
          <div>
            <h2 style={componentPageStyles.smallTitle}>Dialog</h2>
            <p style={componentPageStyles.smallDesc}>
              Check in daily to earn generous rewards and unlock exclusive benefits every day.
            </p>
          </div>
        </div>
        <div className="component-card component-card--small" data-card="smallCard4" style={componentPageStyles.smallCard}>
          <div style={componentPageStyles.smallImageWrapper}>
            <div style={componentPageStyles.smallImageFrame}>
              <img
                src={images.small4}
                alt="Check in UI"
                className="component-img-base component-img--small"
                style={componentPageStyles.smallImgBase}
                referrerPolicy="no-referrer"
              />
              <img
                src={images.small4Hover}
                alt="Check in UI Hover"
                className="component-img-hover component-img--small"
                style={componentPageStyles.smallImgHover}
              />
            </div>
          </div>
          <div>
            <h2 style={componentPageStyles.smallTitle}>Share panel</h2>
            <p style={componentPageStyles.smallDesc}>
              Check in daily to earn generous rewards and unlock exclusive benefits every day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
