import ScrollMagic from 'scrollmagic';
import scrollGsap from '../vendor/scrollmagic-gsap-plugin';
import TweenMax from 'gsap';
import debounce from 'lodash.debounce';

const scrollCtrl = new ScrollMagic.Controller();
const SMALL_BREAKPOINT = 640;

export function pinScroll(selector, opts = {
  release: false,
  secondaryAnimation: false
}) {
  const triggerElement = document.querySelector(selector);
  const pinScene = new ScrollMagic.Scene({
    triggerElement,
    triggerHook: 'onLeave'
  })
  .setPin(selector)
  .addTo(scrollCtrl);

}

export function pinSlideIn(selector) {
  const triggerElement = document.querySelector(selector);
  const cards = triggerElement.querySelectorAll('.js-card-slide-in');
  const line1 = cards[0].querySelector('.js-animate-line');
  const line2 = cards[1].querySelector('.js-animate-line');

  const tl = new TimelineMax();

  if (window.innerWidth < SMALL_BREAKPOINT) {
    TweenMax.set(cards[0], {y: '-100%', opacity: 0});
    TweenMax.set(cards[1], {y: '100%', opacity: 0});
    TweenMax.set(line1, {scaleY: '0%'});
    TweenMax.set(line2, {scaleY: '0%'});
    TweenMax.set(line1, {backgroundSize: '10px 20px'});
    TweenMax.set(line2, {backgroundSize: '10px 20px'});

    tl.to(cards[0], 1, {
      y: '0%', opacity: 1
    })
    .to(cards[1], 1, {
      y: '0%', opacity: 1
    }, '-=1')
    .to(line1, 1, {
      scaleY: 1, backgroundSize: '10px 10px'
    })
    .to(line2, 1, {
      scaleY: 1, backgroundSize: '10px 10px'
    }, '-=1');

  } else {
    TweenMax.set(cards[0], {x: '-100%', opacity: 0});
    TweenMax.set(cards[1], {x: '100%', opacity: 0});
    TweenMax.set(line1, {scaleX: '0%'});
    TweenMax.set(line2, {scaleX: '0%'});
    TweenMax.set(line1, {backgroundSize: '20px 10px'});
    TweenMax.set(line2, {backgroundSize: '20px 10px'});

    tl.to(cards[0], 1, {
      x: '0%', opacity: 1
    })
    .to(cards[1], 1, {
      x: '0%', opacity: 1
    }, '-=1')
    .to(line1, 1, {
      scaleX: 1, backgroundSize: '10px 10px'
    })
    .to(line2, 1, {
      scaleX: 1, backgroundSize: '10px 10px'
    }, '-=1');
  }

  new ScrollMagic.Scene({
    triggerElement,
    offset: 0.3
  })
  .setTween(tl)
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
