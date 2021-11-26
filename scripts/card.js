import { openImagePopup } from './script.js';

export class Card {
  constructor(data, templateName) {
    this._getTemplate(data, templateName);
  }

  _getTemplate(data, templateName) {
    this._element = document
      .querySelector(templateName)
      .content.cloneNode(true);
    this._img = this._element.querySelector('.element__image');
    this._like = this._element.querySelector('.element__like');
    this._title = this._element.querySelector('.element__title');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._img.src = data.link;
    this._img.alt = data.name;
    this._title.textContent = data.name;
  }

  _deleteCard(button) {
    const closestElement = button.closest('.element');
    closestElement.remove();
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', (evt) =>
      this._deleteCard(evt.target)
    );
    this._img.addEventListener('click', (evt) => openImagePopup(evt.target));
    this._like.addEventListener('click', (evt) =>
      evt.target.classList.toggle('element__like_active')
    );
  }

  createCard() {
    this._setEventListeners();
    return this._element;
  }
}
