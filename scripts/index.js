import {Card} from './Card.js';
import { FormValidator, selectorsSet } from './FormValidator.js';

const popups = document.querySelectorAll('.popup');

const profile = document.querySelector('.profile');
const editProfileBtn = profile.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const editProfileForm = document.forms.editProfileForm;
const nameInput = editProfileForm.elements.profileName;
const jobInput = editProfileForm.elements.profileJob;

const cardsContainer = document.querySelector('.cards');
const addCardBtn = profile.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardForm = document.forms.addCardForm;
const titleInput = addCardForm.elements.cardTitle;
const linkInput = addCardForm.elements.cardLink;

const popupImage = document.querySelector('.popup_type_image');
const imageLink = popupImage.querySelector('.popup__image');
const imageName = popupImage.querySelector('.popup__image-name');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscape); 
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
}

function closeEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}


function createNewCard(title,link) {
const newCard = new Card( title, link, "#card");
const cardElement = newCard.createCard();
return cardElement;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createNewCard(titleInput.value, linkInput.value);
  cardsContainer.prepend(newCard);
  closePopup(popupAddCard);
  addCardForm.reset();
}

initialCards.forEach ((item) => {
  const newCard = createNewCard(item.name, item.link);
  cardsContainer.prepend(newCard);
});

Array.from(popups).forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    } 
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
})

const formsList = Array.from(document.querySelectorAll(selectorsSet.formSelector));
const validatorsList = [];
let validator = 0;
formsList.forEach((form) => {
  validatorsList[validator] = new FormValidator(selectorsSet, form);
  validatorsList[validator].enableValidation();
  validator = validator + 1;
})

editProfileBtn.addEventListener('click', () => {
  openPopup(popupEditProfile); 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

addCardBtn.addEventListener('click', () => openPopup(popupAddCard));

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

export {cardsContainer, openPopup, popupImage, imageLink, imageName};