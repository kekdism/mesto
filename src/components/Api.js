export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  async _checkStatus(responce) {
    if (!responce.ok) {
      return Promise.reject(console.log(responce.status));
    }
    return await responce.json();
  }

  async getCard(id = '') {
    const res = await fetch(`${this._baseUrl}/cards/`, {
      method: 'GET',
      headers: this._headers,
    });
    return await this._checkStatus(res);
  }

  async getUserInfo(user) {
    const res = await fetch(`${this._baseUrl}/users/${user}`, {
      method: 'GET',
      headers: this._headers,
    });
    return await this._checkStatus(res);
  }

  async updateUserInfo(user, data) {
    const res = await fetch(`${this._baseUrl}/users/${user}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return await this._checkStatus(res);
  }

  async updateUserAvatar(user, data) {
    const res = await fetch(`${this._baseUrl}/users/${user}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return await this._checkStatus(res);
  }

  async postCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return await this._checkStatus(res);
  }

  async handleCardLike(method, cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    });
    return await this._checkStatus(res);
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return await this._checkStatus(res);
  }
}
