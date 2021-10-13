export default class UserInfo {
  constructor({profiletitle, profileSubtitle}, profileavatar) {
    this._userNameElement = document.querySelector(profiletitle);
    this._userAboutMeElement = document.querySelector(profileSubtitle);
    this._userAvatarElement =document.querySelector(profileavatar);
    console.log(profileavatar + '  UserInfo');
  }

  getUserInfo() {
    /* this._userInfo = {};
    return {
      name: this._userNameElement.textContent,
      about: this._userAboutMeElement.textContent
    } */
    //this._userInfo = {};
    return{
      name: this._userNameElement.textContent,
      about: this._userAboutMeElement.textContent
    }
    /* this._userInfo.name= this._userNameElement.textContent;
    this._userInfo.about = this._userAboutMeElement.textContent;

    return this._userInfo; */
  }

  setUserInfo({ name, about }) {
    this._userNameElement.textContent = name;
    this._userAboutMeElement.textContent = about;
    
    //console.log(UserInfo.avatar + '  UserInfo');
  }
  setUserInfoAvatar({ avatar }){
    this._userAvatarElement.src= avatar;
  }
}
  
