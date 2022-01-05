import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._popup.querySelector('.form__save');
    this._defaultButtonText = this._submitButton.textContent;
  }

  setSubmit(handleSubmit) {
    this._form.addEventListener('submit', handleSubmit);
  }

  showLoadingText(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  }
}
