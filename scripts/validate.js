

////////////////////////////////////////////////////////////////////////////////////////////////////////
const configValid ={
    formSelector: '.popup__form',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorMessage: {
        empty:'Это поле обязательно',
        url:'Введите правильный url',
        minSimbols:'Минимальное колличество символов 2'
    }
}


const formUser=document.forms.editingInformation;


//Валидный ли инпут
function isFieldValid(input, config) {
    input.setCustomValidity('');

    if (input.validity.valueMissing){
        input.setCustomValidity(config.errorMessage.empty);
        input.classList.add(config.inputErrorClass);
        return false
    }else{
        input.classList.remove(config.inputErrorClass);
    }

    if (input.validity.tooShort){
        input.setCustomValidity(config.errorMessage.minSimbols);
        input.classList.add(config.inputErrorClass);
        return false
    }

    if (input.validity.typeMismatch && input.type === 'url'){
        input.setCustomValidity(config.errorMessage.url);
        input.classList.add(config.inputErrorClass);
        return false
    }

    return input.checkValidity();
}
//сама валидация
function validateField(input, config) {
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    isFieldValid(input, config);

    errorElement.textContent = input.validationMessage;
}
//Состояние кнопки
function setSubmitButtonState (button, state, config) {
    console.log(state);
    if(state){
        
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;

        return true
    }

    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
}
//обработчик
function handlerInputForm(input, config) {
    const form = input.parentNode;
    const submitButton = form.querySelector(config.submitButtonSelector);

    validateField(input, config);
    

    if(form.checkValidity()){
        setSubmitButtonState(submitButton, true, config);
    } else{
        setSubmitButtonState(submitButton, false, config);
    }
}

//Отправка формы
function sendForm(evt) {
    // теперь ничего не лелает
} 


const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {handlerInputForm(inputElement, config);}, true);
    });
    buttonElement.addEventListener('submit', sendForm);
  };

function enableValidation (config){
    const form= document.querySelector('#popup-add-container');
    const profile = document.querySelector('#popup-profile');

    setEventListeners(form, config)
    setEventListeners(profile, config)
}

enableValidation(configValid);