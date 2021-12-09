export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayAndButtonClose(evt) {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close')
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener(
      'click',
      this._handleOverlayAndButtonClose.bind(this)
    );
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.remove('popup_opened');
  }
}
