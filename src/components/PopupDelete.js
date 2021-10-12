import Popup from "./Popup.js";
export default class PopupDelete extends Popup{
    constructor(handleSubmitForm, popupSelector){
        super(popupSelector);
        this._handleSubmitForm= handleSubmitForm;
        this._handleSubmitForm=this._handleSubmitForm.bind(this);
    }
    open(card, cardId){
        super.open();
        this._cardId = cardId;
        this._card = card;
        
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleSubmitForm(this._card, this._cardId);
        });
    }
}