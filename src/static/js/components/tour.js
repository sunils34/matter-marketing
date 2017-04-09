// inspired by http://codepen.io/sdras/pen/VjvGJM
import TweenMax from 'gsap';
const DURATION = 2;

export default function tour(selector) {
  const el = document.querySelector(selector);
  const sbj = el.querySelector('.js-tour-subject');
  const steps = el.querySelectorAll('.js-tour-step');
  const tl = new TimelineMax({
    repeat: -1
  });

  tl.pause();

  steps.forEach(step => {
    addAnimationStep(tl, step.getBBox(), sbj, DURATION);
  });

  addAnimationStep(tl, steps[0].getBBox(), sbj, DURATION);

  tl.play();
}

function addAnimationStep(timeline, target, subject, duration) {
  const amt = 75;
  const newView = `${(target.x - amt)} ${(target.y - amt)} ${(target.width + amt * 2)} ${(target.height + amt * 2)}`;
  timeline.to(subject, duration, {
    attr: { viewBox: newView },
    ease: Power4.easeInOut
  });
}
