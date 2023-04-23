import {cardsContainer, openPopup, popupImage, imageName, imageLink} from "./index.js";

class Card {
    constructor(name, link, templateSelector) {
      this._name = name; 
      this._link = link;
    
      this._cardElement = cardsContainer.querySelector(templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    
      this._cardImage = this._cardElement.querySelector('.card__image');
    }
    
    _fillTemplate() {
      this._cardElement.querySelector('.card__title').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
    }
    
    _toggleLike(evt){
        evt.target.classList.toggle('card__like-button_active')
   } 

    _deleteCard(evt){
    evt.target.closest('.card').remove()
} 
    _handleImageClick(evt){
    openPopup(popupImage);
    imageLink.src = evt.target.src;
    imageLink.alt = evt.target.alt;
    imageName.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
} 

    _setEventListeners() {
      this._cardElement.querySelector('.card__like-button').addEventListener('click', (evt) =>  this._toggleLike(evt));
      this._cardElement.querySelector('.card__trash-button').addEventListener('click', (evt) => this._deleteCard(evt));
      this._cardImage.addEventListener('click', (evt) => this._handleImageClick(evt))
    }
    
    createCard() {
      this._fillTemplate();
      this._setEventListeners();
      return this._cardElement;
    }
  }
  
  export {Card};