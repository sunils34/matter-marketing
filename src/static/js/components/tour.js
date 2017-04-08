// inspired by http://codepen.io/sdras/pen/VjvGJM
import TweenMax from 'gsap';

export default function tour(selector) {
  const tl = new TimelineMax({
    repeat: -1
  });
  tl.pause();
  const el = document.querySelector(selector);
  const sbj = el.querySelector('.js-tour-subject');
  const steps = el.querySelectorAll('.js-tour-step');
  const amt= 75;

  steps.forEach((step, index) => {
    const target = step.getBBox();
    // const newView = "" + (s.x - amt) + " " + (s.y - amt) + " " + (s.width + amt*2) + " " + (s.height + amt*2);
    const newView = `${(target.x - amt)} ${(target.y - amt)} ${(target.width + amt * 2)} ${(target.height + amt * 2)}`;
    tl.to(sbj, 2, {
      attr: { viewBox: newView },
      ease: Power4.easeInOut
    })
  });
  tl.play();
}
