import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = [...this._form.querySelectorAll('.form__input')];
    this._submitButton = this._popup.querySelector('.form__save');
    this._defaultButtonText = this._submitButton.textContent;
  }

  getInputValues() {
    return this._inputList.reduce((acc, item) => {
      acc[item.id] = item.value;
      return acc;
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  showLoadingText = (isLoading) => {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._defaultButtonText;
    }
  };

  getForm() {
    return this._form;
  }

  close() {
    this._form.reset();
    super.close();
  }
}
