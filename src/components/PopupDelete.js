import Popup from "./Popup.js";
export default class PopupDelete extends Popup{
    constructor(handleSubmitForm, popupSelector){
        super(popupSelector);
        this._handleSubmitForm= handleSubmitForm;
        this._handleSubmitForm=this._handleSubmitForm.bind(this);
        this._submitFormCallback = this._submitForm.bind(this);
        this._formElement = this._popup.querySelector('.popup__form');
    }
    open(card, cardId){
        super.open();
        this._cardId = cardId;
        this._card = card;
        
    }
    _submitForm(evt) {
        evt.preventDefault();
        this._handleSubmitForm(this._card, this._cardId);
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._submitFormCallback);
    }
    
    removeEventListeners() {
        super.removeEventListeners();
        this._formElement.removeEventListener('submit', this._submitFormCallback);
    }
    
    
}