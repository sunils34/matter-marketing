import TweenMax from 'gsap';
import ScrollMagic from 'scrollmagic';
import scrollGsap from '../vendor/scrollmagic-gsap-plugin';

const scrollCtrl = new ScrollMagic.Controller();

// export default function(selector, duration, startProps, endProps) {
//   const els = document.querySelectorAll(selector);

//   els.forEach(el => {
//     TweenMax.set(el, startProps);
//     // el.matterAnim = TweenMax.to(el, Object.assign(endProps, {paused: true}));
//     el.matterAnim = TweenMax.to(el, Object.assign(endProps, {paused: true}));
//   })
// }
export default function animTrigger(selector, className) {
  const els = document.querySelectorAll(selector);

  els.forEach(el => {
    const scene = new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: 'onEnter'
    })
    .setClassToggle(el, className)
    .addTo(scrollCtrl);
  });
}
