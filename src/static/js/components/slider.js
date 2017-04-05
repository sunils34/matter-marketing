import Flickity from 'flickity';

export default function slider(selector, options) {
  var elem = document.querySelector(selector);
  return new Flickity( elem, options);
}
