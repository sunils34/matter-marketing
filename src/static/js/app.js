import slider from './components/slider';
import processAnimation from './components/process-animation';

slider('.js-feature-slider');
slider('.js-card-slider', {
  prevNextButtons: false,
  pageDots: false
});
processAnimation('.js-anim-process');
