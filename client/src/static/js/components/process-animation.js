import TweenMax from 'gsap';

// https://ihatetomatoes.net/greensock-timelinelite-tutorial/

export default function processAnimation(selector) {
  const container = document.querySelector(selector);
  const line = container.querySelectorAll('.line__solid')[0];
  const tl = new TimelineMax();
  tl.pause();
  tl.to(line, 4, {
    css:{strokeDashoffset: 0}
  });
  tl.play();

}
