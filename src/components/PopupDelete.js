import Popup from "./Popup.js";
export default class PopupDelete extends Popup{
    constructor(handleSubmitForm, popupSelector){
        super(popupSelector);
        this._handleSubmitForm= handleSubmitForm;
    }
    open(card, cardId, deleteCard){
        super.open();
        this._cardId = cardId;
        this._card = card;
        this.deleteCard = deleteCard;
    }
    cardId() {
        return this._cardId;
    }
    /* deleteCard(){

    } */
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleSubmitForm(this._card, this._cardId, this.deleteCard);
        });
    }
}