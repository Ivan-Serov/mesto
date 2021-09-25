import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor({ data }, popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__image');
    this._captionElement = this._popup.querySelector('.popup__title_img');
    this._nameImage = data.name;
    this._linkImage = data.link;
  }

  open() {
    super.open();
    this._imageElement.src = this._linkImage;
    this._imageElement.alt = this._nameImage;
    this._captionElement.textContent = this._nameImage;
  }
}