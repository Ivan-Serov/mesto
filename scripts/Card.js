import { openPopup, popupImage } from './index.js'

class Card{
    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
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
    _ShowImage(){
        //const popupImage = document.querySelector('#popup-image');
        const image = popupImage.querySelector('.popup__image');
        const imageTitle = popupImage.querySelector('.popup__title');
        openPopup(popupImage);
        image.src = this._link;
        image.alt = this._name;
        imageTitle.textContent = this._name;
       /*  image.src = evt.target.src;
        image.alt = evt.target.alt;
        imageTitle.textContent = evt.target.alt; */
    }
    _setEventListeners() {
        this._element.querySelector('.places__like').addEventListener('click', () => {
            this._handleLikeIcon();
          });
          this._element.querySelector('.places__delete').addEventListener('click', () => {
            this._deleteCard();
          });
          this._element.querySelector('.places__image').addEventListener('click', () => {
            this._ShowImage();
          });
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