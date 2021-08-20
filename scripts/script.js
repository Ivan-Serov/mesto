const popup = document.querySelector('.popup');
// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_user');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_user-information');// Воспользуйтесь инструментом .querySelector()

const editButton = document.querySelector('.profile__edit');

const profiletitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupProfile = document.querySelector('#popup-profile');


  // закрытие попап кликом на оверлей
function closePopupOnOverlay(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup_opened')) {
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

const placesContainer = document.querySelector('.places');


// создание карточки с функционалом элементов
function createCard(elm) {
  const card= document.querySelector('#places-card-template').content.firstElementChild.cloneNode(true);
  const cardImage = card.querySelector('.places__image');

  cardImage.src = elm.link;
  cardImage.alt = elm.name;
  card.querySelector('.places__title').textContent = elm.name;
  card.querySelector('.places__like').addEventListener('click', handleLikeIcon);
  card.querySelector('.places__delete').addEventListener('click', deleteCard);
  cardImage.addEventListener('click', showImage);
  
  return card;
}

// отрисовка карточки на странице 
function renderPlace(elm) {
  placesContainer.prepend(createCard(elm));
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
  if (titleInput.value && linkInput.value) {
    renderPlace(newPost);
    
  }
  closePopup(popupPlace);
  document.querySelector('#popup-form-add').reset();
}

formAddCard.addEventListener('submit', submitAddCardForm);

function handleLikeIcon(evt) {
  evt.target.classList.toggle('places__like_active');
}
function deleteCard(e) {
  e.target.closest('.places__card').remove();
}

const popupImage = document.querySelector('#popup-image');
const imgCloseBtn = popupImage.querySelector('#popup-close-image')
const image = popupImage.querySelector('.popup__image');
const imageTitle = popupImage.querySelector('.popup__title');

function showImage(evt){
  openPopup(popupImage);
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageTitle.textContent = evt.target.alt;
}
imgCloseBtn.addEventListener('click', function(){
  closePopup(popupImage)
});