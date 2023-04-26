import './index.css';
import { initialCards, buttonOpenPopupProfile, formEditProfile, buttonAddCard, formAddCard, inputProfileName, inputProfileJob } from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator, selectorsSet } from '../components/FormValidator.js';

function addCard(name, link, sectionElement) {
  const newCard = new Card(name, link, "#card", (name, link) => {
    popupWithImage.open({ name, link });
  });
  sectionElement.addItem(newCard.createCard());
}

const cardsContainer = new Section({ items: initialCards, renderer: (item) => {
  addCard(item.name, item.link, cardsContainer);
} }, '.cards');
cardsContainer.renderItems();

const validatorEditProfile = new FormValidator(selectorsSet, formEditProfile);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(selectorsSet, formAddCard);
validatorAddCard.enableValidation();

const popupUserInfo = new UserInfo({ name: '.profile__title', job: '.profile__subtitle' });

const popupWithImage = new PopupWithImage('.popup_type_image');

popupWithImage.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  popupUserInfo.setUserInfo(inputValues['profileName'], inputValues['profileJob']);
  popupEditProfile.close();
});

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-card', (inputValues) => {
  addCard(inputValues.cardTitle, inputValues.cardLink, cardsContainer);
  popupAddCard.close();
});

popupAddCard.setEventListeners();

buttonOpenPopupProfile.addEventListener('click', () => {
  formEditProfile.reset();
  popupEditProfile.open();

  const getInfo = popupUserInfo.getUserInfo();
  inputProfileName.value = getInfo.title;
  inputProfileJob.value = getInfo.subtitle;
})

buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  popupAddCard.open();
})