import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ handleSubmitForm }, popupSelector) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitFormCallback = this._submitForm.bind(this);
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    //console.log(data.name+ ' ooooo');
    this._getInputValues();
    //console.log(Object.assign(this._formValues, data)+ ' Object.assign');
    Object.assign(this._formValues, data);
    //console.log(this._formValues.name+ ' _formValues');
    this._inputList.forEach(input => {
      //console.log(this._formValues[input.name]+ 'this._formValues[input.name]');
      input.value = this._formValues[input.name];
    });
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handleSubmitForm(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitFormCallback);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._formElement.removeEventListener('submit', this._submitFormCallback);
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
