const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const formPopup = document.querySelector('.popup__form');
const pageName = document.querySelector('.profile__name');
const pageDesc = document.querySelector('.profile__description');
const newName = document.querySelector('.popup__input_name');
const newDesc = document.querySelector('.popup__input_description');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  newName.value = pageName.textContent.trim();
  newDesc.value = pageDesc.textContent;
  popup.classList.add('popup_opened');
}

function saveInfo(evt) {
  evt.preventDefault();
  pageName.innerText = newName.value;
  pageDesc.textContent = newDesc.value;
  closePopup();
}

buttonOpenPopup.addEventListener('click', openPopup);

buttonClosePopup.addEventListener('click', closePopup);

formPopup.addEventListener('submit', saveInfo);
