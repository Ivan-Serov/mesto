

////////////////////////////////////////////////////////////////////////////////////////////////////////
const configValid ={
    formSelector: '.popup__form',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    inputSpanError: '.error',
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
        this._inputSpanError = config.inputSpanError;
        //////////
        console.log(this._formElement);
        this._inputList = formElement.querySelectorAll(this._inputSelector);
        this._spanErrorList = formElement.querySelectorAll(this._inputSpanError);
        this._btnSave = formElement.querySelector(this._submitButtonSelector)
    }

    _showInputError(input, message){
       
        input.classList.add(this._inputErrorClass);
        input.setCustomValidity(message);
        return false
    }
    //Валидный ли инпут
    _isFieldValid(input) {
        input.setCustomValidity('');

        if (input.validity.valueMissing){
           
            this._showInputError(input, this._errorMessage.empty);
        }else{
            input.classList.remove(this._inputErrorClass);
        }

        if (input.validity.tooShort){
            this._showInputError(input, this._errorMessage.minSimbols);
        }

        if (input.validity.typeMismatch && input.type === 'url'){
            this._showInputError(input, this._errorMessage.url);
        }
        
        return input.checkValidity();
    }
    //сама валидация
    _validateField(input) {
        const errorElement = this._formElement.parentNode.querySelector(`#${input.id}-error`);
        this._isFieldValid(input);
        errorElement.textContent = input.validationMessage;
    }
    resetValidation() {
        
        let allInputValid = true;
        this._inputList.forEach((inputElement) => {
            inputElement.setCustomValidity('');
            inputElement.classList.remove(this._inputErrorClass);
            allInputValid = allInputValid && inputElement.checkValidity();   
        });
        this._setSubmitButtonState (allInputValid);
        this._spanErrorList.forEach((spanElement) => {
            spanElement.textContent = '';
        });

    }
    //Состояние кнопки
    _setSubmitButtonState (state) {
        if(state){
        
            this._btnSave.classList.remove(this._inactiveButtonClass);
            this._btnSave.disabled = false;

            return true;
        }
        else{
            this._btnSave.classList.add(this._inactiveButtonClass);
            this._btnSave.disabled = true;
            return false;
        }
        
    }
    //обработчик
    _handlerInputForm(input) {
        this._validateField(input);
        
        if(this._formElement.checkValidity()){
            this._setSubmitButtonState(true);
        } else{
            this._setSubmitButtonState(false);
        }
    }

    _setEventListeners (){

        
        this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {this._handlerInputForm(inputElement);}, true);
        });

    }
    
    enableValidation (){

        this._setEventListeners();
    }
}

export { FormValidator, configValid }


