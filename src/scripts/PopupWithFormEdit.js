import PopupWithForm from './PopupWithForm.js';

export default class PopupWithFormEdit extends PopupWithForm {
  constructor(popupSelector, handleFormSubmit, userInfo) {
    super(popupSelector, handleFormSubmit);
    this._userInfo = userInfo;
  }
  open() {
    const nameInput = this._form.querySelector('#edit-name');
    const descinput = this._form.querySelector('#edit-description');
    const { name, description } = this._userInfo.getUserInfo();
    nameInput.value = name;
    descinput.value = description;
    super.open();
  }
}
