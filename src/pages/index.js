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
  popupImage
} from '../utils/constants.js'
import '../pages/index.css'; // добавьте импорт главного файла стилей 
import { Card } from '../components/Card.js';
import { FormValidator, configValid } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
const editProfileFormValidate = new FormValidator(configValid, formEditProfile);
const addPostFormValidate = new FormValidator(configValid, formAddCard);


const userInfo = new UserInfo({profiletitle, profileSubtitle});
const popupEditProfile = new PopupWithForm({
  handleSubmitForm: (item) => {
    userInfo.setUserInfo(item);
    popupEditProfile.close();
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
  data: initialCards,
  renderer: (item) => {
    const postCard = createCard(item);
    cardList.addItem(postCard);
  }
}, sectionSelector);

// вызов отрисовки постов на странице 
cardList.renderItems();
////////////////////////////////////////////////////////////
// открытие окна добавления карты

addButton.addEventListener('click', handleOpenPopupAddPost)

function createCard(item){
  const post = new Card({
    data: item,
    handleCardClick: () => handleCardClick(item)
  }, templateSelector);
  const postElement = post.generatePost();
  //cardList.addItem(postElement);
  return postElement;

}
// обработчик открытия попапа добавления поста
const popupAddPlace = new PopupWithForm({
  handleSubmitForm: (item) => {
    
    const postCard = createCard(item);
    cardList.addItem(postCard);
    popupAddPlace.close();
  }
}, popupPlace);
function handleOpenPopupAddPost() {

  addPostFormValidate.resetValidation();

  popupAddPlace.open();
}
const popupWithImage = new PopupWithImage(popupImage);
function handleCardClick(dataParam) {
  popupWithImage.open(dataParam);
}


////////////////////////////

editProfileFormValidate.enableValidation();
addPostFormValidate.enableValidation();




