export default class Card {
  constructor(data, templateSelector, myId, handleCardClick, handleButtonTrashClick, putLike, deleteLike) {
    this._name = data.name; 
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._myId = myId;

    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleButtonTrashClick = handleButtonTrashClick;
    this._deleteLike = deleteLike;
    this._putLike = putLike;
  
    this._cardElement = this._getCardTemplate();
    
    this._buttonTrash = this._cardElement.querySelector('.card__trash-button');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._heartCount = this._cardElement.querySelector('.card__like-count');
    this._buttonLike = this._cardElement.querySelector('.card__like-button');
  }

  _isLiked () {
    return this._likes.find(like => like._id === this._myId);
  }
  
  _getCardTemplate() {
    return document.querySelector(this._template)
    .content
    .querySelector('.card')
    .cloneNode(true);
  }

  _fillTemplate() {
    this._cardElement.querySelector('.card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    if (this._isLiked()) {
      this._buttonLike.classList.add('card__like-button_active');
    }
    this._heartCount.textContent = this._likes.length;
  }
  
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      if (this._isLiked()) {
        this._deleteLike(this._id);
      } else {
        this._putLike(this._id);
      }
    });
    
    if (this._ownerId !== this._myId) {
      this._buttonTrash.remove();
    } else {
      this._buttonTrash.addEventListener('click', () => {
        this._handleButtonTrashClick(this._id);
      });
    }
    
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  updateLikes(data) {
    this._likes = data.likes;
    this._heartCount.textContent = this._likes.length;
    this._buttonLike.classList.toggle('card__heart-button_active');
  }

  deleteCard() {
    this._cardElement.remove();
  }
  
  createCard() {
    this._fillTemplate();
    this._setEventListeners();
    return this._cardElement;
  }
}