export default class UserInfo {
  constructor({profiletitle, profileSubtitle}) {
    this._userNameElement = document.querySelector(profiletitle);
    this._userAboutMeElement = document.querySelector(profileSubtitle);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.user= this._userNameElement.textContent;
    this._userInfo.about = this._userAboutMeElement.textContent;

    return this._userInfo;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.user;
    this._userAboutMeElement.textContent = data.about;
  }
}