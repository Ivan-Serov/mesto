//const popup = document.querySelector('.popup');
import '../pages/index.css'; // добавьте импорт главного файла стилей 
import { Card } from './Card.js';
import { FormValidator, configValid } from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo';

// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const editButton = document.querySelector('.profile__edit');







// обработчик открытия попапа редактирования профиля
const profiletitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
//console.log(document.querySelector(profiletitle)+' jjjjj');


const userInfo = new UserInfo({profiletitle, profileSubtitle});
function handleOpenPopupEditProfile() {
   
  const popup = new PopupWithForm({
    handleSubmitForm: (item) => {
      
      userInfo.setUserInfo(item);
      //console.log(item+ 'userInfo index');
      popup.close();
    }
  }, "#popup-profile");

  popup.setInputValues(userInfo.getUserInfo());

  popup.open();
}


const formEditProfile = document.querySelector('.popup__form');

editButton.addEventListener('click', handleOpenPopupEditProfile);


///////////////////////////////////////////////

const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const place = new Card({
      data: cardItem,
      handleCardClick: () => handleCardClick(cardItem)
    }, '#places-card-template');


    const placeElement = place.generatePost();
    cardList.addItem(placeElement);
    //////////
    
  }
}, '.places');

// вызов отрисовки постов на странице 

cardList.renderItems();
////////////////////////////////////////////////////////////


//const popupPlace = document.querySelector('#popup-add');
// открытие окна добавления карты
const addButton = document.querySelector('.profile__add');
addButton.addEventListener('click', handleOpenPopupAddPost)



const formAddCard = document.querySelector('#popup-add-container');

// обработчик открытия попапа добавления поста
function handleOpenPopupAddPost() {
  const popup = new PopupWithForm({
    handleSubmitForm: (item) => {
      const post = new Card({
        data: item,
        handleCardClick: () => handleCardClick(item)
      }, '#places-card-template');
      
      const postElement = post.generatePost();
      cardList.addItem(postElement);
      popup.close();
    }
  }, '#popup-add');
  
  
  buttonSaveDisabled(buttonSavepAddProfile);
  popup.open();
}


function handleCardClick(dataParam) {
  const popup = new PopupWithImage({
    data: dataParam
  }, '#popup-image');
  popup.open();
}


const buttonSavepAddProfile = document.querySelector('#btn-add-save');

function buttonSaveDisabled(buttonElement){
  buttonElement.classList.add('popup__save_disabled');
  buttonElement.disabled = true;
}
////////////////////////////
const editProfileFormValidate = new FormValidator(configValid, formEditProfile);
const addPostFormValidate = new FormValidator(configValid, formAddCard);

editProfileFormValidate.enableValidation();
addPostFormValidate.enableValidation();




