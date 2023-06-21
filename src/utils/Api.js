class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // метод проверяет есть ли ошибка
  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ошибки: ${res.status}`);
  }
  // метод производит загрузкк карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // метод добавляет карточки на страницу
  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }
  // метод удаления карточек
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // метод получения данных с сервера
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  //метод для изменения данных с сервера
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkError(res));
  }
  // метод изменения данных аватара
  patchAvatarInfo(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }
  // метод добавления лайка
  getLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // метод удаления лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }

}


// объект класса Api
 
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    "Content-Type": "application/json",
    authorization: "839f0bcd-454c-4502-9292-a3578896039c",
  },
});

export default api;