const popupImage = document.querySelector('.popup_type_image');
const imageLink = popupImage.querySelector('.popup__image');
const imageName = popupImage.querySelector('.popup__image-name');

const profile = document.querySelector('.profile');
const buttonEditAvatar = profile.querySelector('.profile__edit-avatar');
const buttonOpenPopupProfile = profile.querySelector('.profile__edit-button');
const formEditProfile = document.forms.editProfileForm;
const formEditAvatar = document.forms.editAvatarForm;

const buttonAddCard = profile.querySelector('.profile__add-button');
const formAddCard = document.forms.addCardForm;

export {buttonEditAvatar, formEditAvatar, buttonOpenPopupProfile, formEditProfile, buttonAddCard, formAddCard, popupImage, imageLink, imageName};