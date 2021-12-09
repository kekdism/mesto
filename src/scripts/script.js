import '../pages/index.css';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithFormEdit from './PopupWithFormEdit.js';
import UserInfo from './UserInfo.js';

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

const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
/*const addPopup = document.querySelector('.popup_add');
const addForm = addPopup.querySelector('.form');
const elementName = addForm.querySelector('#add-name');
const elementUrl = addForm.querySelector('#add-url');
const editPopup = document.querySelector('.popup_edit');
const editForm = editPopup.querySelector('.form');

const imagePopup = document.querySelector('.popup_image');
const image = imagePopup.querySelector('.big-image__image');
const caption = imagePopup.querySelector('.big-image__caption');

const elements = document.querySelector('.elements');*/
const userNameSelector = '.profile__name';
const userDescSelector = '.profile__description';
const cardTemplateId = '#element-template';

const userInfo = new UserInfo(userNameSelector, userDescSelector);

const setInitialCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        cardTemplateId,
        imagePopup.open.bind(imagePopup)
      );
      setInitialCards.appendItem(card.createCard());
    },
  },
  '.elements'
);

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  const { 'edit-name': name, 'edit-description': description } =
    editPopup._getInputValues();
  console.log(name, description);
  userInfo.setUserInfo({ name, description });
  editPopup.close();
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const { 'add-name': name, 'add-url': link } = addPopup._getInputValues();

  const card = new Card(
    { name, link },
    cardTemplateId,
    imagePopup.open.bind(imagePopup)
  );
  setInitialCards.prependItem(card.createCard());
  addPopup.close();
};

const imagePopup = new PopupWithImage('.popup_image');
const editPopup = new PopupWithFormEdit(
  '.popup_edit',
  handleEditFormSubmit,
  userInfo
);
const addPopup = new PopupWithForm('.popup_add', handleAddFormSubmit);
imagePopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();

setInitialCards.renderItems();

buttonOpenEditPopup.addEventListener('click', editPopup.open.bind(editPopup));

buttonOpenAddPopup.addEventListener('click', addPopup.open.bind(addPopup));

const addValidation = new FormValidator(settings, addPopup.getForm());
addValidation.enableValidation();

const editValidation = new FormValidator(settings, editPopup.getForm());
editValidation.enableValidation();
