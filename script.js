const buttonOpenPopup = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.popup__close');
const submitPopup = document.querySelector('.popup__save');
const popup = document.querySelector('.popup');
const formPopup = document.querySelector('.popup__container');
const pageName = document.querySelector('.profile__name');
const pageDesc = document.querySelector('.profile__description');
const newName = document.querySelector('.popup__name');
const newDesc = document.querySelector('.popup__description');
console.log(submitPopup);
buttonOpenPopup.addEventListener('click', function () {
  newName.value = pageName.textContent.trim();
  newDesc.value = pageDesc.textContent;
  popup.classList.toggle('popup_opened');
});

buttonClosePopup.addEventListener('click', function () {
  popup.classList.toggle('popup_opened');
});

formPopup.addEventListener('submit', function (evt) {
  evt.preventDefault();
  pageName.innerText = newName.value;
  pageDesc.textContent = newDesc.value;
});
