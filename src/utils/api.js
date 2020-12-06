import { apiOptions, checkResponse } from "./utils";

class Api {
  constructor(options) {
    this._token = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-Type"];
  }

  //***************************************************************************
  // Загрузка информации о пользователе с сервера:

  getUserInfo() {
    return fetch(`${this._token}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    }).then(checkResponse);
  }

  //***************************************************************************
  // Загрузка карточек с сервера:

  getInitialCards() {
    return fetch(`${this._token}/cards`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    }).then(checkResponse);
  }

  //***************************************************************************
  // Редактирование профиля:

  editProfile({ name, about }) {
    return fetch(`${this._token}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(checkResponse);
  }

  //***************************************************************************
  // Добавление новой карточки:

  addNewCard({ name, link }) {
    return fetch(`${this._token}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(checkResponse);
  }

  //***************************************************************************
  // Добавление/удаление лайка:

  changeLikeDislikeStatus(cardId, isLiked) {
    return fetch(`${this._token}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(checkResponse);
  }

  //***************************************************************************
  // Удаление карточки:

  deleteCard(cardId) {
    return fetch(`${this._token}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(checkResponse);
  }

  //***************************************************************************
  // Обновление аватара пользователя:

  editAvatar({ avatar }) {
    return fetch(`${this._token}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    }).then(checkResponse);
  }
}

const api = new Api(apiOptions);
export default api;