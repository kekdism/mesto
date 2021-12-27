export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _checkStatus = async (responce) => {
    if (!responce.ok) {
      return Promise.reject(console.log(responce.status));
    }
    return responce.json();
  };

  getCard = async (id = '') => {
    try {
      const res = await fetch(`${this._baseUrl}/cards/`, {
        method: 'GET',
        headers: this._headers,
      });
      return await this._checkStatus(res);
    } catch (err) {
      console.log(err);
    }
  };

  getUserInfo = async (user) => {
    try {
      const res = await fetch(`${this._baseUrl}/users/${user}`, {
        method: 'GET',
        headers: this._headers,
      });
      return await this._checkStatus(res);
    } catch (err) {
      console.log(err);
    }
  };

  updateUserInfo = async (user, data) => {
    try {
      const res = await fetch(`${this._baseUrl}/users/${user}`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data),
      });
      return await this._checkStatus(res);
    } catch (err) {
      console.log(err);
    }
  };

  updateUserAvatar = async (user, data) => {
    try {
      const res = await fetch(`${this._baseUrl}/users/${user}/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data),
      });
      return await this._checkStatus(res);
    } catch (err) {
      console.log(err);
    }
  };

  postCard = async (data) => {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
      });
      return await this._checkStatus(res);
    } catch (err) {
      console.log(err);
    }
  };

  handleCardLike = async (method, cardId) => {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: method,
        headers: this._headers,
      });
      return await this._checkStatus(res);
    } catch (err) {
      console.log(err);
    }
  };

  deleteCard = async (cardId) => {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      });
      return await this._checkStatus(res);
    } catch (err) {
      console.log(err);
    }
  };
}
