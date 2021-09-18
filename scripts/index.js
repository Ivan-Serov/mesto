//const popup = document.querySelector('.popup');

import { Card } from './Card.js';
import { FormValidator, configValid } from './FormValidator.js';
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
const nameInput = document.querySelector('.popup__input_type_user');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_user-information');// Воспользуйтесь инструментом .querySelector()

const editButton = document.querySelector('.profile__edit');

const profiletitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupProfile = document.querySelector('#popup-profile');


  // закрытие попап кликом на оверлей
function closePopupOnOverlay(evt) {
   
    if (evt.target.classList.contains('popup_opened')) {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
}
  // закрытие попап нажатием на esc
function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
  
  document.addEventListener('keydown', closePopupOnEsc);
  popup.addEventListener('click', closePopupOnOverlay);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  popup.removeEventListener('click', closePopupOnOverlay);
}

function submitEditProfileForm (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profiletitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  
  const form = evt.target;
  //const submitButton = form.querySelector(configValid.submitButtonSelector);
  //setSubmitButtonState(submitButton, true, configValid);
  closePopup(popupProfile);
}
function editProfile(){
  openPopup(popupProfile);
    /* popOpen(); */
  nameInput.value = profiletitle.textContent;
  jobInput.value = profileSubtitle.textContent;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
const formEditProfile = document.querySelector('.popup__form');
formEditProfile.addEventListener('submit', submitEditProfileForm); 
editButton.addEventListener('click', editProfile);
/* editButton.addEventListener('click', popOpen); */
const editProfilePopupCloseBtn = document.querySelector('.popup__close');

editProfilePopupCloseBtn.addEventListener('click', function () {
  closePopup(popupProfile);
});
///////////////////////////////////////////////////////////////////

//const placesContainer = document.querySelector('.places');


// создание карточки с функционалом элементов

// отрисовка карточки на странице 
function renderPlace(elm) {
  const places = document.querySelector('.places');
  const place = new Card(elm, '#places-card-template');

  const placeElement = place.generatePost();
  places.prepend(placeElement);
 
}

initialCards.forEach(renderPlace);

const popupPlace = document.querySelector('#popup-add');
// открытие окна добавления карты
const addButton = document.querySelector('.profile__add');
addButton.addEventListener('click', function () {
  openPopup(popupPlace);
})

// закрытие окна добавления карты
const addCardPopupCloseBtn = document.querySelector('#popup-close-add');
addCardPopupCloseBtn.addEventListener('click', function () {
  closePopup(popupPlace);
});

const formAddCard = document.querySelector('#popup-add-container');
const titleInput = formAddCard.querySelector('.popup__input_type_title');
const linkInput = formAddCard.querySelector('.popup__input_type_image-link');

// обработчик отправки формы добавления карты
function submitAddCardForm(evt) {
  evt.preventDefault();
  const newPost = {
    name: titleInput.value,
    link: linkInput.value
  }
  
  renderPlace(newPost);
  closePopup(popupPlace);
  document.querySelector('#popup-form-add').reset();
  buttonSaveDisabled(buttonSavepAddProfile)
  //const form = evt.target;
  //const submitButton = form.querySelector(configValid.submitButtonSelector);
  //setSubmitButtonState(submitButton, false, configValid);
}

formAddCard.addEventListener('submit', submitAddCardForm);



const popupImage = document.querySelector('#popup-image');
const imgCloseBtn = popupImage.querySelector('#popup-close-image')
const image = popupImage.querySelector('.popup__image');
const imageTitle = popupImage.querySelector('.popup__title');

function showImage(link, name){
  openPopup(popupImage);
  image.src = link;
  image.alt = name;
  imageTitle.textContent =name;
 /*  openPopup(popupImage);
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageTitle.textContent = evt.target.alt; */
}

imgCloseBtn.addEventListener('click', function(){
  closePopup(popupImage)
});

////////////////////////////
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




export { openPopup, popupImage,showImage }