export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    templateName,
    handleCardClick,
    checkOwner,
    handleCardLike,
    { handleCardDelete }
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes.map((like) => like._id);
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
    const closestElement = this._element
      .querySelector('.element__delete')
      .closest('.element');
    closestElement.remove();
  };

  getId = () => {
    return this._id;
  };

  _handleLikeButton = async (evt) => {
    if (!evt.target.classList.contains('element__like-icon_active')) {
      try {
        const { likes } = await this._handleCardLike('PUT', this._id);
        this._likes = likes.map((like) => like._id);
        this._counter.textContent = this._likes.length;
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const { likes } = await this._handleCardLike('DELETE', this._id);
        this._likes = likes.map((like) => like._id);
        this._counter.textContent = this._likes.length;
      } catch (err) {
        console.log(err);
      }
    }
    evt.target.classList.toggle('element__like-icon_active');
  };

  _setEventListeners = () => {
    const img = this._element.querySelector('.element__image');
    const like = this._element.querySelector('.element__like-icon');
    const deleteButton = this._element.querySelector('.element__delete');

    if (!this._checkOwner(this._ownerId)) {
      deleteButton.classList.add('element__delete_inactive');
    } else {
      deleteButton.addEventListener('click', this._handleCardDelete);
    }
    img.addEventListener('click', this._handleCardClick);
    like.addEventListener('click', this._handleLikeButton);
    if (this._likes.some(this._checkOwner)) {
      like.classList.add('element__like-icon_active');
    }
  };

  createCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
    return this._element;
  };
}
