export const apiOptions = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-15",
  headers: {
    authorization: "805da766-1e17-442b-aa98-c904fbf55e62",
    "Content-Type": "application/json",
  },
};

export const baseUrl = "https://auth.nomoreparties.co";

export const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
