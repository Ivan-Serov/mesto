
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

const placesCont = document.querySelector('.places');
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// создание карточки с функционалом элементов
function addPlace(elm) {
  const newElm= document.querySelector('#places-card-template').content.firstElementChild.cloneNode(true);

  newElm.querySelector('.places__image').src = elm.link;
  newElm.querySelector('.places__image').alt = elm.name;
  newElm.querySelector('.places__title').textContent = elm.name;
  newElm.querySelector('.places__like').addEventListener('click', handleLikeIcon);
  newElm.querySelector('.places__delete').addEventListener('click', deleteCard);
  newElm.querySelector('.places__image').addEventListener('click', showImage);
  
  return newElm;
}

// отрисовка карточки на странице 
function renderPlace(elm) {
  placesCont.prepend(addPlace(elm));
}

initialCards.forEach(renderPlace);

const popupPlace = document.querySelector('#popup-add');
// открытие окна добавления карты
const addButton = document.querySelector('.profile__add');
addButton.addEventListener('click', function () {
  openPopup(popupPlace);
})

// закрытие окна добавления карты
const addCloseButton = document.querySelector('#popup-add .popup__close');
addCloseButton.addEventListener('click', function () {
  closePopup(popupPlace);
});

const formAddEl = document.querySelector('#popup-add .popup__container');
const titleInput = formAddEl.querySelector('.popup__text_type_title');
const linkInput = formAddEl.querySelector('.popup__text_type_image-link');

// обработчик отправки формы добавления карты
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  const newPost = {
    name: titleInput.value,
    link: linkInput.value
  }
  if (titleInput.value && linkInput.value) {
    renderPlace(newPost);
  }
  closePopup(popupPlace);
 
}

formAddEl.addEventListener('submit', formSubmitHandlerAdd);

function handleLikeIcon(evt) {
  evt.target.classList.toggle('places__like_active');
}
function deleteCard(e) {
  e.target.closest('.places__card').remove();
}

const popImg = document.querySelector('#popup-image');
const imgCloseBtn = popImg.querySelector('#popup-close-image')
const image = popImg.querySelector('.popup__image');
const imageTitle = popImg.querySelector('.popup__title');

function showImage(evt){
  openPopup(popImg);
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageTitle.textContent = evt.target.alt;
}
imgCloseBtn.addEventListener('click', function(){
  closePopup(popImg)
});