import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmit) {
    super(popupSelector);
    this._formElement = this._element.querySelector('.popup__form');
    this._buttonSubmit = this._formElement.querySelector('.popup__submit-button');
    this._textButtonSubmit = this._buttonSubmit.textContent;
    this._handleSubmit = handleSubmit;
    this._inputValues = {};
    this._inputs = Array.from(this._formElement.elements);
  }

  _getInputValues () {
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
  }

  close () {
    super.close();
    this._formElement.reset();
  }

  setInputValues (data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    })
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._handleSubmit(this._inputValues);
    });
  }

  renderLoading (isLoading) {
    (isLoading) ? this._buttonSubmit.textContent = 'Сохранение...' : this._buttonSubmit.textContent = this._textButtonSubmit;
  }
}