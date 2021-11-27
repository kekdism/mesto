import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_add');
const addForm = addPopup.querySelector('.form');
const elementName = addForm.querySelector('#add-name');
const elementUrl = addForm.querySelector('#add-url');
const editPopup = document.querySelector('.popup_edit');
const editForm = editPopup.querySelector('.form');
const newName = editForm.querySelector('#edit-name');
const newDesc = editForm.querySelector('#edit-description');
const imagePopup = document.querySelector('.popup_image');
const image = imagePopup.querySelector('.big-image__image');
const caption = imagePopup.querySelector('.big-image__caption');
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__description');
const elements = document.querySelector('.elements');
const cardTemplateId = '#element-template';
const settings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'form__input_errored',
  errorClass: 'form__input-error_visable',
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const closePopup = () => {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEscape);
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupWithEscape);
};

const closePopupWithEscape = (evt) => {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

const closeOnOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = newName.value;
  userDesc.textContent = newDesc.value;
  closePopup(editPopup);
};

const openEditPopup = () => {
  newName.value = userName.textContent;
  newDesc.value = userDesc.textContent;
  openPopup(editPopup);
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const name = elementName.value;
  const link = elementUrl.value;
  elements.prepend(new Card({ name, link }, cardTemplateId).createCard());
  addForm.reset();
  closePopup(addPopup);
};

const openAddPopup = () => {
  openPopup(addPopup);
};

export const openImagePopup = (evt) => {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.alt;
  openPopup(imagePopup);
};

const setInitialState = () => {
  initialCards.forEach((item) => {
    const newCard = new Card(item, cardTemplateId).createCard();
    elements.append(newCard);
  });
  newName.value = userName.textContent;
  newDesc.value = userDesc.textContent;
};

const setPopupsListeners = (popupList) => {
  popupList.forEach((popup) => {
    popup.addEventListener('click', closeOnOverlay);
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', closePopup);
  });
};

setInitialState();

buttonOpenEditPopup.addEventListener('click', openEditPopup);

buttonOpenAddPopup.addEventListener('click', openAddPopup);

addForm.addEventListener('submit', handleAddFormSubmit);

editForm.addEventListener('submit', handleEditFormSubmit);

new FormValidator(settings, addForm).enableValidation();

new FormValidator(settings, editForm).enableValidation();

setPopupsListeners([editPopup, addPopup, imagePopup]);
