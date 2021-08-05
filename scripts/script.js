let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__content');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__text_type_user');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__text_type_user-information');// Воспользуйтесь инструментом .querySelector()

let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
////////////////////////////////////////////////////////////////////////////
let popupAdd = document.getElementById('popup-add');
let addButton = document.querySelector('.profile__add');
let addCloseButton = document.getElementById('popup-close-add');

let titleInput = document.getElementById('.popup__text_type_title');// Воспользуйтесь инструментом .querySelector()
let imgInput = document.getElementById('.popup__text_type_image-link');// Воспользуйтесь инструментом .querySelector()

let titleLoc = document.querySelector('.places__title');
let imgLoc = document.querySelector('.places__image');

let formAddEl = document.getElementById('formAddPlace');
let templateEl= document.getElementById('places-card-template');
////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////
function popAddOpen(){
    popupAdd.classList.add('popup_opened');
}
function popAddClose(){
    popupAdd.classList.remove('popup_opened');
}
function addPlace(titleValue, img){
    const mestoTemplate = document.querySelector('#places-card-template').content;
    const cardElement = mestoTemplate.querySelector('.places__card').cloneNode(true);
    cardElement.querySelector('places__image').
}

 /* function addPlace(){
    popAddOpen();
    //////!111
     titleInput.value = titleLoc.textContent;
    imgInput.value = imgLoc.textContent; 
    ////////1/111
  } 
function formSubmitHandler1 (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    const newEl= templateEl.content.firstElementChild.cloneNode(true);
    newEl.querySelector('.places__title').innerText=titleInput.value;
    popupAdd.appendChild(newEl);
    titleInput.value='';
/////////////////////////////!!!!!!!!!!!!!!!!11
    titleLoc.textContent = titleInput.value;
    imgLoc.textContent = imgInput.value;
   //////////////////////////////////// 1111111111
    popAddClose(); 
}
formElement.addEventListener('submit', formSubmitHandler1); 
addButton.addEventListener('click', addPlace);  */
addButton.addEventListener('click', popAddOpen);
addCloseButton.addEventListener('click', popAddClose);
///////////////////////////////////////////////////////////////////////////
function popOpen(){
    popup.classList.add('popup_opened');
    
}
function popClose(){
    popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

   
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popClose();
}
function editProfile(){
    popOpen();
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
  




// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
editButton.addEventListener('click', editProfile);

closeButton.addEventListener('click', popClose);
/////////////////////////////////////////////
/* addButton.addEventListener('click', popAddOpen) */