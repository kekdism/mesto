import 'regenerator-runtime/runtime';
import 'core-js/stable';
import '../pages/index.css';

import {
  settings,
  buttonOpenAddPopup,
  buttonOpenEditPopup,
  buttonAvatarEdit,
  userNameSelector,
  userDescSelector,
  userAvatarSelector,
  cardTemplateId,
  editPopupDesc,
  editPopupName,
  serverUrl,
  token,
} from '../utils/constants.js';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

(async () => {
  const handleEditFormSubmit = async (evt) => {
    evt.preventDefault();
    try {
      editPopup.showLoadingText(true);
      const { 'edit-name': name, 'edit-description': about } =
        editPopup.getInputValues();
      userInfo.setUserInfo(await api.updateUserInfo('me', { name, about }));
      editPopup.showLoadingText(false);
      editPopup.close();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddFormSubmit = async (evt) => {
    evt.preventDefault();
    try {
      addPopup.showLoadingText(true);
      const { 'add-name': name, 'add-url': link } = addPopup.getInputValues();
      const newCard = await api.postCard({ name, link });
      setCards.prependItem(createCard(newCard));
      addPopup.showLoadingText(false);
      addPopup.close();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAvatarEdit = async (evt) => {
    evt.preventDefault();
    try {
      avatarPopup.showLoadingText(true);
      const { 'add-avatar-url': avatar } = avatarPopup.getInputValues();
      const newUserInfo = await api.updateUserAvatar('me', { avatar });
      userInfo.setUserInfo(newUserInfo);
      avatarPopup.showLoadingText(false);
      avatarPopup.close();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardLike = async (method, cardId) => {
    try {
      const newLikes = await api.handleCardLike(method, cardId);
      return newLikes;
    } catch (err) {
      console.log(err);
    }
  };

  const checkOwner = (id) => {
    return userInfo.isOwner(id);
  };

  const api = new Api({
    baseUrl: serverUrl,
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
  });

  const userInfo = new UserInfo(
    userNameSelector,
    userDescSelector,
    userAvatarSelector
  );

  userInfo.setUserInfo(await api.getUserInfo('me'));

  const imagePopup = new PopupWithImage('.popup_image');
  imagePopup.setEventListeners();

  const editPopup = new PopupWithForm('.popup_edit', handleEditFormSubmit);
  editPopup.setEventListeners();

  const addPopup = new PopupWithForm('.popup_add', handleAddFormSubmit);
  addPopup.setEventListeners();

  const avatarPopup = new PopupWithForm('.popup_avatar-edit', handleAvatarEdit);
  avatarPopup.setEventListeners();

  const confirmPopup = new PopupWithSubmit('.popup_confirmation');
  confirmPopup.setEventListeners();

  const createCard = (data) => {
    const card = new Card(
      data,
      cardTemplateId,
      imagePopup.open.bind(imagePopup),
      checkOwner,
      {
        handleCardLike: async () => {
          try {
            const method = card.isLiked() ? 'DELETE' : 'PUT';
            const { likes } = await api.handleCardLike(method, card.getId());
            card.updateLikeState(likes);
          } catch (err) {
            console.log(err);
          }
        },
        handleCardDelete: () => {
          confirmPopup.open();
          confirmPopup.setSubmit(async (evt) => {
            try {
              evt.preventDefault();
              await api.deleteCard(card.getId());
              card.deleteCard();
              confirmPopup.close();
            } catch (err) {
              console.log(err);
            }
          });
        },
      }
    );
    return card.createCard();
  };

  const setCards = new Section((item) => {
    setCards.appendItem(createCard(item));
  }, '.elements');

  try {
    const initialCards = await api.getCard();
    setCards.renderItems(initialCards);
  } catch (err) {
    console.log(err);
  }

  buttonOpenEditPopup.addEventListener('click', () => {
    const { name = '', description = '' } = userInfo.getUserInfo();
    editPopupName.value = name;
    editPopupDesc.value = description;
    editPopup.open();
  });

  buttonOpenAddPopup.addEventListener('click', addPopup.open.bind(addPopup));

  buttonAvatarEdit.addEventListener(
    'click',
    avatarPopup.open.bind(avatarPopup)
  );

  const addValidation = new FormValidator(settings, addPopup.getForm());
  addValidation.enableValidation();

  const editValidation = new FormValidator(settings, editPopup.getForm());
  editValidation.enableValidation();

  const avatarValidation = new FormValidator(settings, avatarPopup.getForm());
  avatarValidation.enableValidation();
})();
