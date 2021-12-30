export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _checkStatus = async (responce) => {
    if (!responce.ok) {
      return Promise.reject(console.log(responce.status));
    }
    return await responce.json();
  };

  getCard = async (id = '') => {
    const res = await fetch(`${this._baseUrl}/cards/`, {
      method: 'GET',
      headers: this._headers,
    });
    return await this._checkStatus(res);
  };

  getUserInfo = async (user) => {
    const res = await fetch(`${this._baseUrl}/users/${user}`, {
      method: 'GET',
      headers: this._headers,
    });
    return await this._checkStatus(res);
  };

  updateUserInfo = async (user, data) => {
    const res = await fetch(`${this._baseUrl}/users/${user}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return await this._checkStatus(res);
  };

  updateUserAvatar = async (user, data) => {
    const res = await fetch(`${this._baseUrl}/users/${user}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return await this._checkStatus(res);
  };

  postCard = async (data) => {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return await this._checkStatus(res);
  };

  handleCardLike = async (method, cardId) => {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    });
    return await this._checkStatus(res);
  };

  deleteCard = async (cardId) => {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return await this._checkStatus(res);
  };
}
