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
const cardTemplate = cardsContainer.querySelector('#card').content;
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

function createCard (name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => evt.target.classList.toggle('card__like-button_active'));
  cardElement.querySelector('.card__trash-button').addEventListener('click', (evt) => evt.target.closest('.card').remove());
  cardImage.addEventListener('click', (evt) => {
    openPopup(popupImage);
    imageLink.src = evt.target.src;
    imageLink.alt = evt.target.alt;
    imageName.textContent = evt.target.alt;
  })

  return cardElement;
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(titleInput.value, linkInput.value));
  closePopup(popupAddCard);
  addCardForm.reset();
}

initialCards.forEach ((item) => cardsContainer.prepend(createCard(item.name, item.link)));

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

editProfileBtn.addEventListener('click', () => {
  openPopup(popupEditProfile); 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

addCardBtn.addEventListener('click', () => openPopup(popupAddCard));

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

addCardForm.addEventListener('submit', handleAddCardFormSubmit);