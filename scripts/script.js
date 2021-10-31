const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelector('.popup__close');
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

const handleAddFormSubmit = (evt, popup) => {
  evt.preventDefault();
  const addForm = popup.querySelector('.form');
  const name = popup.querySelector('.form__input_element_name').value;
  const link = popup.querySelector('.form__input_element_url').value;
  elements.prepend(createNewElement({ name, link }));
  addForm.reset();
  closePopup(popup);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const openPopup = (popup) => {
  const popupClose = popup.querySelector('.popup__close');
  popupClose.addEventListener('click', (evt) => {
    closePopup(popup);
  });
  popup.classList.add('popup_opened');
};

const handleEditFormSubmit = (evt, popup) => {
  evt.preventDefault();
  const newName = popup.querySelector('.form__input_info_name');
  const newDesc = popup.querySelector('.form__input_info_description');
  pageName.textContent = newName.value;
  pageDesc.textContent = newDesc.value;
  closePopup(popup);
};

const openEditPopup = () => {
  const popupEdit = document.querySelector('.popup_edit');
  const newName = popupEdit.querySelector('.form__input_info_name');
  const newDesc = popupEdit.querySelector('.form__input_info_description');
  newName.value = pageName.textContent;
  newDesc.value = pageDesc.textContent;
  const editForm = popupEdit.querySelector('.form');
  editForm.addEventListener('submit', (evt) =>
    handleEditFormSubmit(evt, popupEdit)
  );
  openPopup(popupEdit);
};

const openAddPopup = () => {
  const popupAdd = document.querySelector('.popup_add');
  const addForm = popupAdd.querySelector('.form');
  addForm.addEventListener('submit', (evt) =>
    handleAddFormSubmit(evt, popupAdd)
  );
  openPopup(popupAdd);
};

const openImagePopup = (img) => {
  const popupImage = document.querySelector('.popup_image');
  const image = popupImage.querySelector('.big-image__image');
  image.src = img.src;
  image.alt = img.alt;
  const caption = popupImage.querySelector('.big-image__caption');
  caption.textContent = img.alt;
  openPopup(popupImage);
};

const deleteElement = (butt) => {
  const closestElement = butt.closest('.element');
  closestElement.remove();
};

const initialElements = () => {
  initialCards.forEach((item) => {
    elements.append(createNewElement(item));
  });
};

buttonOpenEditPopup.addEventListener('click', openEditPopup);

buttonOpenAddPopup.addEventListener('click', openAddPopup);

initialElements();
