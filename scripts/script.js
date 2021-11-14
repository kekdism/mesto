const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelector('.popup__close');
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
const pageName = document.querySelector('.profile__name');
const pageDesc = document.querySelector('.profile__description');
const elements = document.querySelector('.elements');

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

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  pageName.textContent = newName.value;
  pageDesc.textContent = newDesc.value;
  closePopup(editPopup);
};

const openEditPopup = () => {
  newName.value = pageName.textContent;
  newDesc.value = pageDesc.textContent;
  openPopup(editPopup);
};

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  const name = elementName.value;
  const link = elementUrl.value;
  elements.prepend(createNewElement({ name, link }));
  addForm.reset();
  closePopup(addPopup);
};

const openAddPopup = () => {
  openPopup(addPopup);
};

const openImagePopup = (img) => {
  image.src = img.src;
  image.alt = img.alt;
  caption.textContent = img.alt;
  openPopup(imagePopup);
};

const initialElements = () => {
  initialCards.forEach((item) => {
    elements.append(createNewElement(item));
  });
  newName.value = pageName.textContent;
  newDesc.value = pageDesc.textContent;
};

const createNewElement = (data) => {
  const templateElement = document.querySelector('#element-template').content;
  const newElement = templateElement.cloneNode(true);
  const newImg = newElement.querySelector('.element__image');
  const like = newElement.querySelector('.element__like');
  newImg.src = data.link;
  newImg.alt = data.name;
  const newTitle = newElement.querySelector('.element__title');
  newTitle.textContent = data.name;
  const deleteButton = newElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', (evt) => deleteElement(evt.target));
  newImg.addEventListener('click', (evt) => openImagePopup(evt.target));
  like.addEventListener('click', (evt) =>
    evt.target.classList.toggle('element__like_active')
  );
  return newElement;
};

const deleteElement = (butt) => {
  const closestElement = butt.closest('.element');
  closestElement.remove();
};

const setPopupsListeners = (popupList) => {
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closePopup(popup));
  });
};

initialElements();

buttonOpenEditPopup.addEventListener('click', openEditPopup);

buttonOpenAddPopup.addEventListener('click', openAddPopup);

addForm.addEventListener('submit', (evt) => handleAddFormSubmit(evt));

editForm.addEventListener('submit', (evt) => handleEditFormSubmit(evt));

setPopupsListeners([editPopup, addPopup, imagePopup]);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
});
