import ScrollMagic from 'scrollmagic';
import asdf from '../vendor/scrollmagic-gsap-plugin';
import TweenMax from 'gsap';

const scrollCtrl = new ScrollMagic.Controller();

export function pinScroll(selector, opts = {
  release: false,
  secondaryAnimation: false
}) {
  const triggerElement = document.querySelector(selector);
  new ScrollMagic.Scene({
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

  TweenMax.set(cards[0], {x: '-100%', opacity: 0});
  TweenMax.set(cards[1], {x: '100%', opacity: 0});
  TweenMax.set(line1, {scaleX: '0%'});
  TweenMax.set(line2, {scaleX: '0%'});

  const tl = new TimelineMax();
  tl.to(cards[0], 1, {
    x: '0%', opacity: 1
  })
  .to(cards[1], 1, {
    x: '0%', opacity: 1
  }, '-=1')
  .to(line1, 1, {
    scaleX: 1
  })
  .to(line2, 1, {
    scaleX: 1
  }, '-=1');

  new ScrollMagic.Scene({
    triggerElement,
    offset: 0.3
  })
  .setTween(tl)
  .addTo(scrollCtrl);
}
