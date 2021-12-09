import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    const inputList = [...this._form.querySelectorAll('.form__input')];
    return inputList.reduce((acc, item) => {
      acc[item.id] = item.value;
      return acc;
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  getForm() {
    return this._form;
  }

  close() {
    this._form.reset();
    super.close();
  }
}
