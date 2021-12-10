import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(evt) {
    const image = this._popup.querySelector('.big-image__image');
    const caption = this._popup.querySelector('.big-image__caption');
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    caption.textContent = evt.target.alt;
    super.open();
  }
}
