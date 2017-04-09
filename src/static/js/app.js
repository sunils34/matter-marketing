import slider from './components/slider';
import tour from './components/tour';
import { pinScroll, pinSlideIn } from './components/pin-scroll';
import { simplifyAnimation } from './components/simplify-animation';
import copyright from './components/copyright';
import animTrigger from './components/anim-trigger';

const rootEl = document.getElementsByTagName('html')[0];

if (rootEl.classList) {
  rootEl.classList.add('js');
} else {
  rootEl.className += ' ' + 'js';
}

slider('.js-feature-slider');
slider('.js-business-slider');
tour('.js-tour');
pinScroll('.js-pin-scroll');
// pinScroll('.js-pin-from-sides');
pinSlideIn('.js-pin-slide-in');
copyright('.js-footer-copyright');

animTrigger('.js-cascade-from-top', 'anim--from-top')
