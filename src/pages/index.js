import '../pages/index.css';

import {
  settings,
  initialCards,
  buttonOpenAddPopup,
  buttonOpenEditPopup,
  userNameSelector,
  userDescSelector,
  cardTemplateId,
  editPopupDesc,
  editPopupName,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo(userNameSelector, userDescSelector);

const createCard = (data) => {
  const card = new Card(data, cardTemplateId, imagePopup.open.bind(imagePopup));
  return card.createCard();
};

const setCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      setCards.appendItem(createCard(item));
    },
  },
  '.elements'
);

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  const { 'edit-name': name, 'edit-description': description } =
    editPopup.getInputValues();
  userInfo.setUserInfo({ name, description });
  editPopup.close();
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const { 'add-name': name, 'add-url': link } = addPopup.getInputValues();
  setCards.prependItem(createCard({ name, link }));
  addPopup.close();
};

const imagePopup = new PopupWithImage('.popup_image');
const editPopup = new PopupWithForm('.popup_edit', handleEditFormSubmit);
const addPopup = new PopupWithForm('.popup_add', handleAddFormSubmit);
imagePopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();

setCards.renderItems();

buttonOpenEditPopup.addEventListener('click', () => {
  const { name, description } = userInfo.getUserInfo();
  editPopupName.value = name;
  editPopupDesc.value = description;
  editPopup.open();
});

buttonOpenAddPopup.addEventListener('click', addPopup.open.bind(addPopup));

const addValidation = new FormValidator(settings, addPopup.getForm());
addValidation.enableValidation();

const editValidation = new FormValidator(settings, editPopup.getForm());
editValidation.enableValidation();
