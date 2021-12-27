export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }
  getUserInfo = () => {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };
  };

  setUserInfo = ({
    name = this._userName.textContent,
    about = this._userDescription.textContent,
    avatar,
    _id = this._id,
  }) => {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._userAvatar.style.backgroundImage = `url(${avatar})`;
    this._id = _id;
  };

  isOwner = (id) => {
    return id === this._id;
  };
}
