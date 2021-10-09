

class Card{
    constructor(data, userId, {handleCardClick, handleDelCard/* , handleLikeClick */}, cardSelector/* , {addLike, deleteLike} */){
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDelCard = handleDelCard;

        this._handleDelCard=this._handleDelCard.bind(this);
        this._userId = userId;
        this._deleteButtonHandler = this._deleteButtonHandler.bind(this);
        this._data = data;
//////////////////////////
        /* this._handleLikeClick = handleLikeClick; */
        //this.numberLikes = this.numberLikes.bind(this);
        //this._addLike=addLike;
        //this._deleteLike= deleteLike
    }

    _getTemplate(){
        const cardTemplate = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
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
          this._element.querySelector('.places__delete').addEventListener('click', this._deleteButtonHandler);
          /* this._element.querySelector('.places__delete').addEventListener('click', () => {
            this._deleteCard();
          }); */
          this._element.querySelector('.places__image').addEventListener('click', this._handleCardClick.bind(this));
        
    }
    generatePost() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.places__image').src = this._link;
        this._element.querySelector('.places__image').alt = this._name;
        this._element.querySelector('.places__title').textContent = this._name;
        //////////////
        this._deleteButton = this._element.querySelector('.places__delete');
        this._elementId = this._data._id;
        if (!(this._userId === this._data.owner._id)) {
            this._deleteButton.style.display = "none";
        }


        this._element.querySelector('.places__like-number').textContent = this._likes.length;
        return this._element;
    }

    _deleteButtonHandler() {
        this._handleDelCard(this._element, this._elementId/* , this.deleteCard */);
      }
    
    /* deleteCard() {
        this._element.remove();
      } */
    /* numberLikes(post, likes){
        console.log(post+' post');
        console.log(likes+' likes');
        post.querySelector('.places__like-number').textContent=likes.length;
    } */
};
export {Card};