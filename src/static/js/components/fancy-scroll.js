import ScrollMagic from 'scrollmagic';
import scrollGsap from '../vendor/scrollmagic-gsap-plugin';
import TweenMax from 'gsap';
import debounce from 'lodash.debounce';

const scrollCtrl = new ScrollMagic.Controller();
const SMALL_BREAKPOINT = 640;

export function pinScroll(selector) {
  const triggerElement = document.querySelector(selector);

  const pinScene = new ScrollMagic.Scene({
    triggerElement,
    triggerHook: 'onLeave'
  })
  .setPin(selector)
  .addTo(scrollCtrl);
}

export function onScrollInOut(selector, onEnter, onLeave) {
  const triggerElement = document.querySelector(selector);

  const pinScene = new ScrollMagic.Scene({
    triggerElement,
    triggerHook: 'onLeave'
  })
  .on('enter', onEnter)
  .on('leave', onLeave)
  .addTo(scrollCtrl);
}

export function playTimelineScroll(selector, timeline, offset = 0.5) {
  const triggerElement = document.querySelector(selector);

  const scene = new ScrollMagic.Scene({
    triggerElement,
    triggerHook: offset,
    reverse: false
  })
  .setTween(timeline)
  .addTo(scrollCtrl);
}

function disableBelowBreakpoint(scene, breakpoint) {
  if (window.innerWidth < breakpoint) {
    scene.enabled(false);
  }

  window.addEventListener("resize", debounce(function() {
    if (window.innerWidth < breakpoint && scene.enabled()) {
      scene.enabled(false);
    } else if (window.innerWidth >= breakpoint && !scene.enabled()) {
      scene.enabled(true);
    }
  }, 300));
}
