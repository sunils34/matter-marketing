import Flickity from 'flickity';

export default function slider(selector) {
  var elem = document.querySelector(selector);
  var flkty = new Flickity( elem, {
    // options
    // cellAlign: 'left',
    // contain: true
  });
}
