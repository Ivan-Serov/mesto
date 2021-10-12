

export default class Section {
    constructor({renderer }, containerSelector) {
      //this._initialArray = data;
      this._renderer = renderer;
      this._container= document.querySelector(containerSelector);
    }
  
    renderItems(cards) {
      this._initialArray = cards.reverse();
      this._initialArray.forEach((item) => {
        this._renderer(item);
    });
      /* cards.forEach((item) => {
        this._renderer(item);
      }); */
      /* cards.forEach(item => {
        this._container.prepend(this._renderer(item));
      }); */
    }
  
    addItem(element) {      
      this._container.prepend(element);
    }
    /* getList() {
      return this._container;
    } */
}