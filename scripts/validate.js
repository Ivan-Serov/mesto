

////////////////////////////////////////////////////////////////////////////////////////////////////////
const configValid ={
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error'
}

const formAddCard1=document.forms.formAddPlace;
const formUser=document.forms.editingInformation;

const errorMessage= {
    empty:'Это поле обязательно',
    url:'Введите правильный url',
    minSimbols:'Минимальное колличество символов 2'
}
//Валидный ли инпут
function isFieldValid(input) {
    input.setCustomValidity('');

    if (input.validity.valueMissing){
        input.setCustomValidity(errorMessage.empty);
        input.classList.add(configValid.inputErrorClass);
        return false
    }else{
        input.classList.remove(configValid.inputErrorClass);
    }

    if (input.validity.tooShort){
        input.setCustomValidity(errorMessage.minSimbols);
        input.classList.add(configValid.inputErrorClass);
        return false
    }

    if (input.validity.typeMismatch && input.type === 'url'){
        input.setCustomValidity(errorMessage.url);
        input.classList.add(configValid.inputErrorClass);
        return false
    }

    return input.checkValidity();
}
//сама валидация
function validateField(input) {
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    isFieldValid(input);

    errorElement.textContent = input.validationMessage;
}
//Состояние кнопки
function setSubmitButtonState (button, state) {
    console.log(state);
    if(state){
        //button.setAtribute('disabled', false);
        
        button.classList.remove(configValid.inactiveButtonClass);
 
        // button.classList.add('popup__button_valid') //Надо сделать CSS
        // button.classList.remove('popup__button_invalid') //Надо сделать CSS
        return true
    }
    // button.classList.remove('popup__button_valid') //Надо сделать
    button.classList.add(configValid.inactiveButtonClass);
    
    //button.setAtribute('disabled', true);
}
//обработчик
function handlerInputForm(evt) {
    const form = evt.target.parentNode;
    const input = evt.target;
/*     console.log('input'+ input);
    console.log('form '+ form); */
    const submitButton = form.querySelector(configValid.submitButtonSelector);

    validateField(input);
    

    if(form.checkValidity()){
        setSubmitButtonState(submitButton, true);
    } else{
        setSubmitButtonState(submitButton, false);
    }
}
//Отправка формы
function sendForm(evt) {
    const form = evt.target;
    const submitButton = form.querySelector(configValid.submitButtonSelector);
    
    if(form.checkValidity()){
        console.log('все ок');
        form.reset();
    } else{
        setSubmitButtonState(submitButton, false);
        console.log('все НЕ ок');
    }
}

formAddCard.addEventListener('submit',sendForm);
formAddCard.addEventListener('input',handlerInputForm, true);

formUser.addEventListener('submit',sendForm);
formUser.addEventListener('input',handlerInputForm, true);