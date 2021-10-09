export default class UserInfo {
  constructor({profiletitle, profileSubtitle}) {
    this._userNameElement = document.querySelector(profiletitle);
    this._userAboutMeElement = document.querySelector(profileSubtitle);
  }

  getUserInfo() {
    /* this._userInfo = {};
    return {
      name: this._userNameElement.textContent,
      about: this._userAboutMeElement.textContent
    } */
    this._userInfo = {};
    return{
      name: this._userNameElement.textContent,
      about: this._userAboutMeElement.textContent
    }
    /* this._userInfo.name= this._userNameElement.textContent;
    this._userInfo.about = this._userAboutMeElement.textContent;

    return this._userInfo; */
  }

  setUserInfo(UserInfo) {
    this._userNameElement.textContent = UserInfo.name;
    this._userAboutMeElement.textContent = UserInfo.about;
    //console.log(data + '  UserInfo');
  }
}