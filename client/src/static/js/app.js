import slider from './components/slider';
import {
  tour,
  simplifySlideIn,
  pauseTimeline,
  playTimeline
} from './components/animations';
import {
  pinScroll,
  pinSlideIn,
  playTimelineScroll,
  onScrollInOut
} from './components/fancy-scroll';
import copyright from './components/copyright';
import animTrigger from './components/anim-trigger';

const rootEl = document.getElementsByTagName('html')[0];

if (rootEl.classList) {
  rootEl.classList.add('js');
} else {
  rootEl.className += ' ' + 'js';
}

const tourAnim = tour('.js-tour');
const simplifyAnim = simplifySlideIn('.js-card-slide-in')

slider('.js-feature-slider');
slider('.js-business-slider', {
  autoPlay: 8000
});
pinScroll('.js-pin-scroll');
playTimelineScroll('.js-tour', tourAnim, 'onEnter');
playTimelineScroll('.js-card-slide-in', simplifyAnim, 0.75);
onScrollInOut('.js-play-pause-tour', () => pauseTimeline(tourAnim), () => playTimeline(tourAnim));
copyright('.js-footer-copyright');

animTrigger('.js-highlight-anim', 'anim--enter');
animTrigger('.js-anim-stagger-from-top', 'anim--stagger-from-top', 0.8);
animTrigger('.js-cta-stagger-hook', 'anim--play', 0.75);
