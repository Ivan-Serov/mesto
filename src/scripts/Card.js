//import { openPopup, popupImage, showImage } from './index.js'

class Card{
    constructor({data, handleCardClick}, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
        const cardTemplate = document.querySelector('#places-card-template').content.firstElementChild.cloneNode(true);
        return cardTemplate;
    }
    _handleLikeIcon(){
        this._element.querySelector('.places__like').classList.toggle('places__like_active');
    }
    _deleteCard(){
        this._element.querySelector('.places__delete').closest('.places__card').remove();
    }
    _setEventListeners() {
        this._element.querySelector('.places__like').addEventListener('click', () => {
            this._handleLikeIcon();
          });
          this._element.querySelector('.places__delete').addEventListener('click', () => {
            this._deleteCard();
          });
          this._element.querySelector('.places__image').addEventListener('click', this._handleCardClick.bind(this));
        
    }
    generatePost() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.places__image').src = this._link;
        this._element.querySelector('.places__image').alt = this._name;
        this._element.querySelector('.places__title').textContent = this._name;
    
        return this._element;
    }
};
export {Card};