let fullPageSwiper;
let verticalMobileSwipers;

function moveToNextSlide() {
  fullPageSwiper.slideNext(200, () => {});
}

function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
}

function initGA() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZG901889B8');
}

function init() {
  initGA();

  window.addEventListener('resize', setVh);
  setVh();

  fullPageSwiper = new Swiper('.desktop-fullpage', {
    // Optional parameters
    direction: 'vertical',
    mousewheel: true,
    loop: false,
  });

  fullPageSwiper.on('slideChange', () => {
    const downArrowElm = document.getElementById('down-arrow-at-bottom');
    if (fullPageSwiper.activeIndex === fullPageSwiper.slides.length - 1) {
      downArrowElm.style.visibility = 'hidden';
    } else {
      downArrowElm.style.visibility = 'visible';
    }
  });

  new Swiper('.mobile-swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false
  });

  if (document.querySelector('.mobile-swiper-v')) {
    verticalMobileSwipers = new Swiper('.mobile-swiper-v', {
      nested: true,
      // https://open-code.tech/en/post-1109/
      effect: 'fade',
      fadeEffect: {
          crossFade: true
      },
      // Optional parameters
      direction: 'vertical',
      loop: false
    });
  }
}

function closeDesc() {
  verticalMobileSwipers.forEach((swiper) => {
    swiper.slidePrev(200, () => {})
  });
}

const WEBGL_MODAL_ID = 'webgl-modal';
const WEBGL_PLAYER_ID = 'webglPlayer';
const SAMPLE_MODAL_ID = 'sample-modal';

function onViewIn3DClicked(collection, itemNo, deviceType) {
  const player = document.getElementById(WEBGL_PLAYER_ID);

  if (collection === 'pinzle') {
    if (deviceType === 'desktop') {
      document.getElementById('prev-3d-btn')
        .style.visibility = 'hidden';
      document.getElementById('next-3d-btn')
        .style.visibility = 'visible';

      if (itemNo === '1') {
        currentActiveWebGLIndex = 1;
        minWebGLIndex = 1;
        maxWebGLIndex = 3;
      } else {
        currentActiveWebGLIndex = 4;
        minWebGLIndex = 4;
        maxWebGLIndex = 6;
      }

      itemNo = currentActiveWebGLIndex;
    } else {
      document.getElementById('prev-3d-btn')
        .style.visibility = 'hidden';
      document.getElementById('prev-3d-btn')
        .style.display = 'none';
      document.getElementById('next-3d-btn')
        .style.visibility = 'hidden';
      document.getElementById('next-3d-btn')
        .style.display = 'none';
    }
  }

  if (collection === 'ifland') {
    if (itemNo === '4' && deviceType === 'desktop') {
      document.getElementById('prev-3d-btn')
        .style.visibility = 'hidden';
      document.getElementById('next-3d-btn')
        .style.visibility = 'visible';
      document.getElementById('webgl-controller')
        .style.visibility = 'visible';
    } else {
      document.getElementById('webgl-controller')
        .style.visibility = 'hidden';
      document.getElementById('webgl-controller')
        .style.display = 'none';
    }

    currentActiveWebGLIndex = 4;
    minWebGLIndex = 4;
    maxWebGLIndex = 5;
  }

  const onShownCallback = () => {
    setTimeout(() => {
      player.startView(collection, itemNo);
    }, 200);
  };
  const onHideCallback = () => {
    player.close();
  };

  document.getElementById(WEBGL_MODAL_ID).open(onShownCallback, onHideCallback);
}

function onSampleClicked(collection, imgIndex, deviceType) {
  const onShownCallback = () => {};
  const onHideCallback = () => {};
  if (collection === 'pinzle' && deviceType === 'desktop') {
    document.getElementById(`sample-modal${imgIndex}`).open(onShownCallback, onHideCallback);
  } else {
    const imgElm = document.querySelector('#sample-modal > img');
    imgElm.src = `../assets/${collection}/sample-${imgIndex}.png`;

    document.getElementById(SAMPLE_MODAL_ID).open(onShownCallback, onHideCallback);
  }
}

function onPurchaseClicked(collection, itemNo, deviceType) {
  const nftPurchaseLink = {
    kansong: {
      "1": "https://ifland.io/",
      "2": "https://ifland.io/",
      "3": "https://ifland.io/"
    },
    pinzle: {
      "1": "https://ifland.io/",
      "2": "https://ifland.io/",
      "3": "https://ifland.io/",
      "4": "https://ifland.io/",
      "5": "https://ifland.io/",
      "6": "https://ifland.io/"
    },
    ifland: {
      "1": "https://ifland.io/",
      "2": "https://ifland.io/",
      "3": "https://ifland.io/",
      "4": "https://ifland.io/",
      "5": "https://ifland.io/"
    }
  };

  const target = nftPurchaseLink[collection][itemNo];
  if (target) {
    window.location.href = target;
  }
}

function onBenefitBadgeClicked() {
  // 각 페이지별로 이미 모달이 존재해서 그냥 띄우기만 하면 됨. (콜렉션 별로 혜택이 동일해서)
  const onShownCallback = () => {};
  const onHideCallback = () => {};
  document.getElementById('benefit-modal').open(onShownCallback, onHideCallback);
}