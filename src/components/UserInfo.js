import PopupWithForm from "./PopupWithForm.js";

export default class UserInfo {
  constructor ({ name, job }) {
    this._titleElement = document.querySelector(name);
    this._subTitleElement = document.querySelector(job);
  }

  getUserInfo () {
    return { title: this._titleElement.textContent, subtitle: this._subTitleElement.textContent};
  }

  setUserInfo ({ name, job }) {
    this._titleElement.textContent = name;
    this._subTitleElement.textContent = job;
  }
}