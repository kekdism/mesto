const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const formPopup = document.querySelector('.popup__form');
const pageName = document.querySelector('.profile__name');
const pageDesc = document.querySelector('.profile__description');
const newName = document.querySelector('.popup__input_info_name');
const newDesc = document.querySelector('.popup__input_info_description');
const elements = document.querySelector('.elements');
const templateElement = document.querySelector('#element-template').content;
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
const initialElements = () => {
  initialCards.forEach((item) => {
    const newElement = templateElement.cloneNode(true);
    const newImg = newElement.querySelector('.element__image');
    newImg.src = item.link;
    newImg.alt = item.name;
    const newTitle = newElement.querySelector('.element__title');
    newTitle.textContent = item.name;
    elements.append(newElement);
  });
};

const handleElementAdd = (evt) => {
  evt.preventDefault();
};

const closePopup = () => {
  popup.classList.remove('popup_opened');
};

const openPopup = () => {
  newName.value = pageName.textContent.trim();
  newDesc.value = pageDesc.textContent;
  popup.classList.add('popup_opened');
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  pageName.textContent = newName.value;
  pageDesc.textContent = newDesc.value;
  closePopup();
};
initialElements();
buttonOpenPopup.addEventListener('click', openPopup);

buttonClosePopup.addEventListener('click', closePopup);

formPopup.addEventListener('submit', handleFormSubmit);
