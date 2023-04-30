import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._form = this._element.querySelector('.popup__form');
  }

  setSubmit (handleSubmit) {
    this._handleSubmit = handleSubmit;
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}