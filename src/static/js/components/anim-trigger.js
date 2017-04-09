import TweenMax from 'gsap';
import ScrollMagic from 'scrollmagic';
import scrollGsap from '../vendor/scrollmagic-gsap-plugin';
import forEach from 'lodash.foreach';

const scrollCtrl = new ScrollMagic.Controller();

export default function animTrigger(selector, className, offset = 0.5) {
  const els = document.querySelectorAll(selector);

  forEach(els, el => {
    const scene = new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: offset
    })
    .setClassToggle(el, className)
    .addTo(scrollCtrl);
  });
}
