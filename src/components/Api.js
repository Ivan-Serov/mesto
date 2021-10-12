export default class Api {
  constructor(url) {
    this._url = url;
    this._authorizationToken = 'd0022a9e-a6be-4d9a-ab6e-3949875c7c34';
  }
  getUserInfo() {
    return fetch(this._url +'/users/me', {
      method: 'GET',
      headers: {
        authorization: this._authorizationToken
      }})
    .then(this.checkResult);
  }
  getInitialCards() {
    return fetch(this._url +'/cards', {
      headers: {
        authorization: this._authorizationToken
      }})
    .then(this.checkResult);
  }
  editProfile(data){
    return fetch(this._url +'/users/me', {
        method: 'PATCH',
        headers: {
          authorization: this._authorizationToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    .then(this.checkResult);
  }
  addPlace(data){
    return fetch(this._url +'/cards', {
      method: 'POST',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this.checkResult);
  }
  deletePost(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json'
      },
    })
    .then(this.checkResult);
  }
  addLike(cardId){
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json'
      },
    })
    .then(this.checkResult);
  }
  deleteLike(cardId){
    return fetch(this._url + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json'
      },
    })
    .then(this.checkResult);
  }
  addAvatar(avatar){
    return fetch(this._url +'/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._authorizationToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    })
    .then(this.checkResult);
  }
  checkResult = res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}