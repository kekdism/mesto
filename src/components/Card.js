export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    templateName,
    handleCardClick,
    checkOwner,
    { handleCardLike, handleCardDelete }
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._ownerId = owner._id;
    this._templateName = templateName;
    this._handleCardClick = handleCardClick;
    this._checkOwner = checkOwner;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate = () => {
    const element = document
      .querySelector(this._templateName)
      .content.children[0].cloneNode(true);
    const img = element.querySelector('.element__image');
    const title = element.querySelector('.element__title');
    this._counter = element.querySelector('.element__like-counter');

    this._counter.textContent = this._likes.length;
    img.src = this._link;
    img.alt = this._name;
    title.textContent = this._name;
    return element;
  };

  deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  getId = () => {
    return this._id;
  };

  updateLikeState = (likes = this._likes) => {
    const likesId = likes.map((like) => like._id);
    this._likes = likes;
    if (likesId.some(this._checkOwner)) {
      this._like.classList.add('element__like-icon_active');
      this._isLiked = true;
    } else {
      this._like.classList.remove('element__like-icon_active');
      this._isLiked = false;
    }
    this._counter.textContent = likesId.length;
  };

  isLiked = () => {
    return this._isLiked;
  };

  _setEventListeners = () => {
    const img = this._element.querySelector('.element__image');
    this._like = this._element.querySelector('.element__like-icon');
    const deleteButton = this._element.querySelector('.element__delete');

    if (!this._checkOwner(this._ownerId)) {
      deleteButton.classList.add('element__delete_inactive');
    } else {
      deleteButton.addEventListener('click', this._handleCardDelete);
    }

    this.updateLikeState();

    img.addEventListener('click', this._handleCardClick);
    this._like.addEventListener('click', this._handleCardLike);
    this.updateLikeState();
  };

  createCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
    return this._element;
  };
}
