// inspired by http://codepen.io/sdras/pen/VjvGJM
import TweenMax from 'gsap';
const DURATION = 2;
const SMALL_BREAKPOINT = 640;

export function tour(selector) {
  const el = document.querySelector(selector);
  const sbj = el.querySelector('.js-tour-subject');
  const steps = el.querySelectorAll('.js-tour-step');
  const tl = new TimelineMax({
    repeat: -1
  });

  steps.forEach(step => {
    addTourStep(tl, step.getBBox(), sbj, DURATION);
  });

  addTourStep(tl, steps[0].getBBox(), sbj, DURATION);

  return tl;
}

function addTourStep(timeline, target, subject, duration) {
  const amt = 75;
  const newView = `${(target.x - amt)} ${(target.y - amt)} ${(target.width + amt * 2)} ${(target.height + amt * 2)}`;
  timeline.to(subject, duration, {
    attr: { viewBox: newView },
    ease: Power2.easeInOut
  });
}

export function simplifySlideIn(selector, callBack) {
  const cards = document.querySelectorAll(selector);
  const line1 = cards[0].querySelector('.js-animate-line');
  const line2 = cards[1].querySelector('.js-animate-line');

  const tl = new TimelineMax({
    delay: -1,
    onComplete: callBack,
    onStart: callBack
  });

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

  return tl;
}

export function pauseTimeline(timeline) {
  timeline.pause();
}
export function playTimeline(timeline) {
  timeline.play();
}
