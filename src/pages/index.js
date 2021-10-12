import {
  initialCards,
  profileSubtitle,
  profiletitle,
  editButton,
  formEditProfile,
  addButton,
  formAddCard,
  templateSelector,
  popupProfile,
  sectionSelector,
  popupPlace,
  popupImage,
  avatar,
  formAvatar,
  btnEditSave,
  btnAddSave,
  btnAvatarSave,
  btnDelSave
} from '../utils/constants.js'
import '../pages/index.css'; // добавьте импорт главного файла стилей 
import { Card } from '../components/Card.js';
import { FormValidator, configValid } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';
const editProfileFormValidate = new FormValidator(configValid, formEditProfile);
const addPostFormValidate = new FormValidator(configValid, formAddCard);
//////////////////
const api = new Api('https://nomoreparties.co/v1/cohort-28');
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    ////////////

    cardList.renderItems(cards);
    userInfo.setUserInfo(userData);
    userInfo.setUserInfoAvatar(userData);

    return userId;


  }).catch((err) => {
    console.log(err);

    return [];
  });
// ///////////////
const userInfo = new UserInfo({profiletitle, profileSubtitle, avatar});

const popupEditProfile = new PopupWithForm({
  handleSubmitForm: (item) => {
    btnEditSave.textContent='Сохранение...';
    
    const userWithServer = api.editProfile(item);
    userWithServer
      .then(({name, about}) => {
        userInfo.setUserInfo({name, about});
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
        return [];
      }) 
      .finally(() => {
        btnEditSave.textContent='Сохранить';
      });
  
    
  }
}, popupProfile);

function handleOpenPopupEditProfile() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  editProfileFormValidate.resetValidation();
  popupEditProfile.open();
}

editButton.addEventListener('click', handleOpenPopupEditProfile);
///////////////////////////////////////////////
const cardList = new Section({
  
  renderer: (item) => {
    const postCard = createCard(item);
    cardList.addItem(postCard);
  }
}, sectionSelector);

// вызов отрисовки постов на странице 
//cardList.renderItems();
////////////////////////////////////////////////////////////
// открытие окна добавления карты

addButton.addEventListener('click', handleOpenPopupAddPost)

function createCard(item){
  const post = new Card(
    item,
    userId,
    {
    handleCardClick: () => handleCardClick(item),
    /* handleDelCard: (post, cardId, deleteCard) => {
      popupDelete.open(post, cardId, deleteCard);
    }, */
    handleDelCard: (postElement, cardId, deleteCard) => {
      popupDelete.open(postElement, cardId, deleteCard);
    },
    handleLikeClick: (likeBtn, cardId,/* . */ card) =>{
      if(likeBtn.classList.contains('places__like_active')){
        api
          .deleteLike(cardId)
          .then((res)=>{
            post.numberLikes(card, res.likes);
          })
          .catch((err) => {
            console.log(err);
  
            return [];
          })
          .then(()=>{
            likeBtn.classList.toggle('places__like_active')
          });
      }
      else{
        api
          .addLike(cardId)
          .then((res) => {
            post.numberLikes(card, res.likes);
          })
          .catch((err) => {
            console.log(err);

            return [];
          })
          .then(()=>{
            likeBtn.classList.toggle('places__like_active')
          });
      }
    }
  }, templateSelector);
  const postElement = post.generatePost();
  //post.numberLikes(item, res.like);
  //cardList.addItem(postElement);
  return postElement;

}
// обработчик открытия попапа добавления поста
const popupAddPlace = new PopupWithForm({
  handleSubmitForm: (item) => {
    btnAddSave.textContent='Сохранение...';
    const place1 = api.addPlace(item);
    place1
      .then((data) => {
        const postCard = createCard(data);
        cardList.addItem(postCard);
        popupAddPlace.close();
      })
      .catch((err) => {
        console.log(err);
        return [];
      })
      .finally(() => {
        btnAddSave.textContent='Создать';
      });
  }

  /* handleSubmitForm: (item) => {
    
    const postCard = createCard(item);
    cardList.addItem(postCard);
    popupAddPlace.close();
  } */
}, popupPlace);
function handleOpenPopupAddPost() {

  addPostFormValidate.resetValidation();

  popupAddPlace.open();
}
const popupWithImage = new PopupWithImage(popupImage);
function handleCardClick(dataParam) {
  popupWithImage.open(dataParam);
}
/////////////////////////////

const popupDelete = new PopupDelete(handleDelCardPopup,'#popup-delete')
function handleDelCardPopup(post, cardId){
  //console.log(cardId+' cardId');
  //popupDelete.open(cardId);
  btnDelSave.textContent='Удаление...';
  api.deletePost(cardId).then(()=>{
      //console.log('udalyaem');
    
      post.remove();
    })
    .catch((err) => {
      console.log(err);

      return [];
    })
    .then(() => {
      popupDelete.close();
    })
    .finally(() => {
      btnDelSave.textContent='Да';
    });
}
////////////////////////////
const popupAvatar = new PopupWithForm({
  handleSubmitForm: ({avatar}) =>{
    btnAvatarSave.textContent='Сохранение...';
    api
      .addAvatar({ avatar })
      .then((res) => {
        userInfo.setUserInfoAvatar(res);
      })
      .catch((err) => {
        console.log(err);
  
        return [];
      })
      .then(() => {
        popupAvatar.close();
      })
      .finally(() => {
        btnAvatarSave.textContent='Создать';
      });
  }
  
}, '#popup-avatar');
function addAvatar(){
  avatarFormValidate.resetValidation();
  popupAvatar.open();
  
}

document.querySelector(avatar).addEventListener('click', addAvatar);
const avatarFormValidate = new FormValidator(configValid, formAvatar);

avatarFormValidate.enableValidation();

editProfileFormValidate.enableValidation();
addPostFormValidate.enableValidation();




