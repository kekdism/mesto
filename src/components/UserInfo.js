export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };
  }

  setUserInfo({
    name = this._userName.textContent,
    about = this._userDescription.textContent,
    avatar,
    _id = this._id,
  }) {
    if (name) {
      this._userName.textContent = name;
    }
    if (about) {
      this._userDescription.textContent = about;
    }
    if (avatar) {
      this._userAvatar.style.backgroundImage = `url(${avatar})`;
    }
    if (_id) {
      this._id = _id;
    }
  }

  isOwner(id) {
    return id === this._id;
  }
}
