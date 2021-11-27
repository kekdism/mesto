import { openImagePopup } from './script.js';

export class Card {
  constructor(data, templateName) {
    this._name = data.name;
    this._link = data.link;
    this._templateName = templateName;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._templateName)
      .content.cloneNode(true);
    const img = element.querySelector('.element__image');
    const title = element.querySelector('.element__title');
    img.src = this._link;
    img.alt = this._name;
    title.textContent = this._name;
    return element;
  }

  _deleteCard(evt) {
    const closestElement = evt.target.closest('.element');
    closestElement.remove();
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
  };

  _setEventListeners() {
    const img = this._element.querySelector('.element__image');
    const like = this._element.querySelector('.element__like');
    const deleteButton = this._element.querySelector('.element__delete');
    deleteButton.addEventListener('click', this._deleteCard);
    img.addEventListener('click', openImagePopup);
    like.addEventListener('click', this._handleLikeButton);
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    return this._element;
  }
}
