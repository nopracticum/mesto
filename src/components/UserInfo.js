export default class UserInfo {
  constructor ({ name, job, avatar }) {
    this._titleElement = document.querySelector(name);
    this._subTitleElement = document.querySelector(job);
    this._avatarElement = document.querySelector(avatar);
  }

  setUserId (id) {
    this._id = id;
  }

  getUserId () {
    return this._id;
  }

  getUserInfo () {
    return { title: this._titleElement.textContent, subtitle: this._subTitleElement.textContent};
  }

  setAvatar (avatar) {
    this._avatarElement.src = avatar;
  }

  setUserInfo (name, job) {
    this._titleElement.textContent = name;
    this._subTitleElement.textContent = job;
  }
}