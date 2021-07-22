let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__content');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__text_type_user');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__text_type_user-information');// Воспользуйтесь инструментом .querySelector()
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

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
