

export default class Section {
    constructor({ data, renderer }, containerSelector) {
      this._initialArray = data;
      this._renderer = renderer;
      this._containerSelector= document.querySelector(containerSelector);
    }
  
    renderItems() {
      this._initialArray.forEach((item) => {
        this._renderer(item);
      });
    }
  
    addItem(element) {      
        /* console.log(element+' element');
        console.log(this._cardSelector+' cardSelector'); */
        this._containerSelector.prepend(element);
    }
    getList() {return this._containerSelector;}
}