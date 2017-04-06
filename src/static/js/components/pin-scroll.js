import ScrollMagic from 'scrollmagic';

const scrollCtrl = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave'
  }
})

export function pinScroll(selector, opts = {
  release: false,
  secondaryAnimation: false
}) {
  const triggerElement = document.querySelector(selector);
  new ScrollMagic.Scene({
    triggerElement
  })
  .setPin(selector)
  .addTo(scrollCtrl);
}

export function pinWithAnimation() {

}
