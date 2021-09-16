

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
    _isFieldValid(input, config) {
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
    _validateField(input, config) {
        const errorElement = this._formElement.parentNode.querySelector(`#${input.id}-error`);
        this._isFieldValid(input, config);
        //input?.validationMessage ? this._setSubmitButtonState(submitButton, false, configValid) : this._setSubmitButtonState(submitButton, true, configValid);
        errorElement.textContent = input.validationMessage;
    }
    //Состояние кнопки
    _setSubmitButtonState (button, state, config) {
        console.log(state);
        if(state){
        
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;

            return true
        }

        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
    }
    //обработчик
    _handlerInputForm(input, config) {
        const form = input.parentNode;
        const submitButton = form.querySelector(this._submitButtonSelector);
        console.log(submitButton);
        this._validateField(input, config);
    

        if(form.checkValidity()){
            this._setSubmitButtonState(submitButton, true, config);
        } else{
            this._setSubmitButtonState(submitButton, false, config);
        }
    }

    _setEventListeners (formElement, config){
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        
        inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {this._handlerInputForm(inputElement, config);}, true);
        });

    }
    /* enableValidation (config){
        const form= Array.from(document.querySelectorAll('.popup__container'));

        form.forEach((forme) => {
            this._setEventListeners(forme,date, config);
            this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
              });
        });

    } */
    
    enableValidation (config){
        const form= Array.from(document.querySelectorAll('.popup__container'));

        form.forEach((forme) => {
            this._setEventListeners(forme, config);
        });

    }
    /* enableValidation(configValid); */
}

export { FormValidator, configValid }


