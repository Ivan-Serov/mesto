

export default class Section {
    constructor({ data, renderer }, cardSelector) {
      this._initialArray = data;
      this._renderer = renderer;
      this._cardSelector= document.querySelector(cardSelector);
    }
  
    renderItems() {
      this._initialArray.forEach((item) => {
        this._renderer(item);
      });
    }
  
    addItem(element) {      
        console.log(element+' element');
        console.log(this._cardSelector+' cardSelector');
        this._cardSelector.prepend(element);
    }
    getList() {return this._cardSelector;}
}