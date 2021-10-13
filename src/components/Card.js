

class Card{
    constructor(data, userId, {handleCardClick, handleDelCard, handleLikeClick}, cardSelector/* , {addLike, deleteLike} */){
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardClick= this._handleCardClick.bind(this)

        this._userId = userId;        
        this._data = data;

        this._handleDelCard = handleDelCard;
        this._handleDelCard=this._handleDelCard.bind(this);
        this._deleteButtonHandler = this._deleteButtonHandler.bind(this);
       
        this._handleLikeClick= handleLikeClick;
        this._handleLikeClick = this._handleLikeClick.bind(this);
        this._handleLikeIcon = this._handleLikeIcon.bind(this);

        
        //////////////////////////
        /* this._handleLikeClick = handleLikeClick; */
        //this.updateLikes = this.updateLikes.bind(this);
        //this._addLike=addLike;
        //this._deleteLike= deleteLike
    }

    _getTemplate(){
        const cardTemplate = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
        return cardTemplate;
    }
    /////////////////
    _handleLikeIcon(evt){
        /* this._element.querySelector('.places__like').classList.toggle('places__like_active'); */
        this._handleLikeClick(evt.target, this._elementId, this._element);
    }
    ////////////////
    _deleteCard(){
        this._element.querySelector('.places__delete').closest('.places__card').remove();
    }
    _setEventListeners() {
        this._element.querySelector('.places__like').addEventListener('click', this._handleLikeIcon);
        this._element.querySelector('.places__delete').addEventListener('click', this._deleteButtonHandler);
          /* this._element.querySelector('.places__delete').addEventListener('click', () => {
            this._deleteCard();
          }); */
        this._element.querySelector('.places__image').addEventListener('click', this._handleCardClick);
        
    }
    generatePost() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._imageElm=this._element.querySelector('.places__image');
        this._imageElm.src = this._link;
        this._imageElm.alt = this._name;
        this._element.querySelector('.places__title').textContent = this._name;
        //////////////
        this._likeBtn = this._element.querySelector('.places__like');
        this._likeNum = this._element.querySelector('.places__like-number');
        //this._likeNum.textContent = this._data.likes.length;

        this._deleteButton = this._element.querySelector('.places__delete');
        this._elementId = this._data._id;
        if (!(this._userId === this._data.owner._id)) {
            this._deleteButton.style.display = "none";
        }
        /////////////////////
        this._data.likes.forEach(elm =>{
            if(elm._id === this._userId){
                this._element.querySelector('.places__like').classList.add('places__like_active');
            }
        });
        //////////////////////
        this._element.querySelector('.places__like-number').textContent = this._likes.length;
        return this._element;
    }

    _deleteButtonHandler() {
        this._handleDelCard(this._element, this._elementId);
      }
    
    //////////
    isLiked(){
        if(this._likeBtn.classList.contains('places__like_active')){
            return true;
        } else{
            return false;
        }
    
    }
    //////////
    /* updateLikes(post, likes){
        //console.log(post+' post');
        //console.log(likes+' likes');
        this._likeBtn.classList.toggle('places__like_active');
        this._likeNum.textContent=likes.length;
        
    } */
    /* isLiked(){
        this._element.querySelector('.places__like').classList.contains('places__like_active');
    } */
    //////////
    updateLikes(post, likes){

        this._likeBtn.classList.toggle('places__like_active');
        this._likeNum.textContent=likes.length;
        
    }
};
export {Card};