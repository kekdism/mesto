const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
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
  newImg.src = data.link;
  newImg.alt = data.name;
  const newTitle = newElement.querySelector('.element__title');
  newTitle.textContent = data.name;
  return newElement;
};

const handleAddFormSubmit = () => {
  const form = document.querySelector('.form');
  const name = form.querySelector('.form__input_element_name').value;
  const link = form.querySelector('.form__input_element_img-link').value;
  elements.prepend(createNewElement({ name, link }));
  closePopup();
};

const closePopup = () => {
  if (popupContainer.querySelector('.container-content'))
    popupContainer.querySelector('.container-content').remove();
  popup.classList.remove('popup_opened');
};

const openPopup = () => {
  popup.classList.add('popup_opened');
};

const handleEditFormSubmit = () => {
  const form = document.querySelector('.form');
  const newName = form.querySelector('.form__input_info_name');
  const newDesc = form.querySelector('.form__input_info_description');
  pageName.textContent = newName.value;
  pageDesc.textContent = newDesc.value;
  closePopup();
};

const openEditPopup = () => {
  const formTemplate = document.querySelector('#form-template').content;
  const editForm = formTemplate.cloneNode(true);
  editForm.querySelector('.form').classList.add('container-content');
  editForm.querySelector('.form').name = 'edit-form';
  editForm.querySelector('.form__title').textContent = 'Редактировать профиль';
  const firstInput = editForm.querySelectorAll('.form__input')[0];
  firstInput.classList.add('form__input_info_name');
  const secondInput = editForm.querySelectorAll('.form__input')[1];
  secondInput.classList.add('form__input_info_description');
  firstInput.name = 'form__input_info_name';
  secondInput.name = 'form__input_info_description';
  firstInput.value = pageName.textContent;
  secondInput.value = pageDesc.textContent;
  popupContainer.append(editForm);
  openPopup();
};

const openAddPopup = () => {
  const formTemplate = document.querySelector('#form-template').content;
  const addForm = formTemplate.cloneNode(true);
  addForm.querySelector('.form').classList.add('container-content');
  addForm.querySelector('.form').name = 'add-form';
  addForm.querySelector('.form__title').textContent = 'Новое место';
  const firstInput = addForm.querySelectorAll('.form__input')[0];
  firstInput.classList.add('form__input_element_name');
  const secondInput = addForm.querySelectorAll('.form__input')[1];
  secondInput.classList.add('form__input_element_img-link');
  firstInput.name = 'form__input_element_name';
  secondInput.name = 'form__input_element_img-link';
  firstInput.placeholder = 'Название';
  secondInput.type = 'url';
  secondInput.placeholder = 'Ссылка на картинку';
  popupContainer.append(addForm);
  openPopup();
};

const openImagePopup = (img) => {
  const imageTemp = document.querySelector('#image-popup-template').content;
  const newFig = imageTemp.cloneNode(true);
  newFig.querySelector('.big-image').classList.add('container-content');
  const newImg = newFig.querySelector('.big-image__image');
  newImg.src = img.src;
  newImg.alt = img.alt;
  newFig.querySelector('.big-image__caption').textContent = img.alt;
  popupContainer.append(newFig);
  openPopup();
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

buttonClosePopup.addEventListener('click', closePopup);

popupContainer.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (evt.target.name === 'edit-form') handleEditFormSubmit();
  if (evt.target.name === 'add-form') handleAddFormSubmit();
});

elements.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__like'))
    evt.target.classList.toggle('element__like_active');
  if (evt.target.classList.contains('element__delete'))
    deleteElement(evt.target);
  if (evt.target.classList.contains('element__image'))
    openImagePopup(evt.target);
});

initialElements();
