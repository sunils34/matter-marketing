import ScrollMagic from 'scrollmagic';

const scrollCtrl = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave'
  }
})

export default function pinScroll(selector) {
  const triggerElement = document.querySelector(selector);
  new ScrollMagic.Scene({
    triggerElement,
    // duration: '150%'
  })
  .setPin(selector)
  .addTo(scrollCtrl);
}
