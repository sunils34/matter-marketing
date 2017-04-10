import ScrollMagic from 'scrollmagic';
import forEach from 'lodash.foreach';

const scrollCtrl = new ScrollMagic.Controller();

export default function animTrigger(selector, className, offset = 0.5) {
  const els = document.querySelectorAll(selector);

  forEach(els, (el) => {
    const scene = new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: offset
    })
    .setClassToggle(el, className)
    .addTo(scrollCtrl);
  });
}
