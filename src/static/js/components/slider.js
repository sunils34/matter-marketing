import Flickity from 'flickity';

export default function slider(selector, options = {
  wrapAround: true, 
  autoPlay: false
}) {
  var elem = document.querySelector(selector);
  return new Flickity( elem, options);
}
