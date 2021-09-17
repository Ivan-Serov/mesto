

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

class FormValidator {
    constructor(config, formElement) {
        this._submitButtonSelector=config.submitButtonSelector;
        this._inactiveButtonClass=config.inactiveButtonClass;
        this._inputSelector=config.inputSelector;
        this._inputErrorClass=config.inputErrorClass;
        this._errorMessage=config.errorMessage;
        this._formElement=formElement;

    }
    //Валидный ли инпут
    _isFieldValid(input) {
        input.setCustomValidity('');

        if (input.validity.valueMissing){
            input.setCustomValidity(this._errorMessage.empty);
            input.classList.add(this._inputErrorClass);
            return false
        }else{
            input.classList.remove(this._inputErrorClass);
        }

         if (input.validity.tooShort){
            input.setCustomValidity(this._errorMessage.minSimbols);
            input.classList.add(this._inputErrorClass);
            return false
        }

        if (input.validity.typeMismatch && input.type === 'url'){
            input.setCustomValidity(this._errorMessage.url);
            input.classList.add(this._inputErrorClass);
            return false
        }

        return input.checkValidity();
    }
    //сама валидация
    _validateField(input) {
        const errorElement = this._formElement.parentNode.querySelector(`#${input.id}-error`);
        this._isFieldValid(input);
        errorElement.textContent = input.validationMessage;
    }
    //Состояние кнопки
    _setSubmitButtonState (button, state) {
        if(state){
        
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;

            return true
        }

        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
    }
    //обработчик
    _handlerInputForm(input) {
        const form = input.parentNode;
        const submitButton = form.querySelector(this._submitButtonSelector);
        this._validateField(input);
    

        if(form.checkValidity()){
            this._setSubmitButtonState(submitButton, true);
        } else{
            this._setSubmitButtonState(submitButton, false);
        }
    }

    _setEventListeners (){
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        
        inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {this._handlerInputForm(inputElement);}, true);
        });

    }
    
    enableValidation (){

        this._setEventListeners();
    }
}

export { FormValidator, configValid }


