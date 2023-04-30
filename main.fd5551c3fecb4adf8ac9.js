(()=>{"use strict";const e=document.querySelector(".popup_type_image"),t=(e.querySelector(".popup__image"),e.querySelector(".popup__image-name"),document.querySelector(".profile")),s=t.querySelector(".profile__edit-button"),r=document.forms.editProfileForm,n=r.elements.Name,i=r.elements.Job,o=t.querySelector(".profile__add-button"),l=document.forms.addCardForm;class a{constructor(e,t,s,r){this._name=e,this._link=t,this._template=s,this._handleCardClick=r,this._cardElement=this._getCardTemplate(),this._cardImage=this._cardElement.querySelector(".card__image")}_getCardTemplate(){return document.querySelector(this._template).content.querySelector(".card").cloneNode(!0)}_fillTemplate(){this._cardElement.querySelector(".card__title").textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name}_toggleLike(e){e.target.classList.toggle("card__like-button_active")}_setEventListeners(){this._cardElement.querySelector(".card__like-button").addEventListener("click",(e=>this._toggleLike(e))),this._cardElement.querySelector(".card__trash-button").addEventListener("click",(()=>this._cardElement.remove())),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._name,this._link)}))}createCard(){return this._fillTemplate(),this._setEventListeners(),this._cardElement}}class c{constructor(e){this._element=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._element.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._element.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._element.addEventListener("mousedown",(e=>{e.target.classList.contains("popup_opened")&&this.close(),e.target.classList.contains("popup__close-button")&&this.close()}))}}class _ extends c{constructor(e,t){super(e),this._formElement=this._element.querySelector(".popup__form"),this._handleSubmit=t,this._inputValues={},this._inputs=Array.from(this._formElement.elements)}_getInputValues(){this._inputs.forEach((e=>{this._inputValues[e.name]=e.value}))}close(){super.close(),this._formElement.reset()}setEventListeners(){super.setEventListeners(),this._formElement.addEventListener("submit",(e=>{e.preventDefault(),this._getInputValues(),this._handleSubmit(this._inputValues,e)}))}}const d={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonAttribute:"disabled",inputErrorClass:"popup__input_invalid",errorClass:"popup__input-error_active"};class u{constructor(e,t){this._selectorsSet=e,this._form=t,this._buttonSubmit=this._form.querySelector(this._selectorsSet.submitButtonSelector),this._inputsList=Array.from(this._form.querySelectorAll(this._selectorsSet.inputSelector))}_hideInputError(e){const t=this._form.querySelector(`.${e.id}-error`);t.textContent="",t.classList.remove(this._selectorsSet.errorClass),e.classList.remove(this._selectorsSet.inputErrorClass)}_showInputError(e,t){const s=this._form.querySelector(`.${e.id}-error`);s.textContent=t,s.classList.add(this._selectorsSet.errorClass),e.classList.add(this._selectorsSet.inputErrorClass)}_submitBtnState(){this._form.checkValidity()?this._buttonSubmit.removeAttribute(this._selectorsSet.inactiveButtonAttribute):this._buttonSubmit.setAttribute(this._selectorsSet.inactiveButtonAttribute,!0)}_checkInputValidity(e){this._submitBtnState(),e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_setEventListeners(){this._inputsList.forEach((e=>{e.addEventListener("input",(()=>this._checkInputValidity(e)))})),this._form.addEventListener("reset",(()=>{setTimeout((()=>{this._submitBtnState()})),this._inputsList.forEach((e=>{this._form.addEventListener("reset",(()=>this._hideInputError(e)))}))}))}enableValidation(){this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}}function p(e,t,s){const r=new a(e,t,"#card",((e,t)=>{E.open({name:e,link:t})}));s.addItem(r.createCard())}const m=new class{constructor(e,t){let{items:s,renderer:r}=e;this._items=s,this._renderer=r,this._container=document.querySelector(t)}renderItems(){this._items.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:e=>{p(e.name,e.link,m)}},".cards");m.renderItems(),new u(d,r).enableValidation(),new u(d,l).enableValidation();const h=new class{constructor(e){let{name:t,job:s}=e;this._titleElement=document.querySelector(t),this._subTitleElement=document.querySelector(s)}getUserInfo(){return{title:this._titleElement.textContent,subtitle:this._subTitleElement.textContent}}setUserInfo(e){let{name:t,job:s}=e;this._titleElement.textContent=t,this._subTitleElement.textContent=s}}({name:".profile__title",job:".profile__subtitle"}),E=new class extends c{constructor(e){super(e),this._image=this._element.querySelector(".popup__image"),this._imageName=this._element.querySelector(".popup__image-name")}open(e){let{name:t,link:s}=e;this._image.src=s,this._image.alt=t,this._imageName.textContent=t,super.open()}}(".popup_type_image");E.setEventListeners();const v=new _(".popup_type_edit-profile",(e=>{h.setUserInfo(e),v.close()}));v.setEventListeners();const b=new _(".popup_type_add-card",(e=>{p(e.cardTitle,e.cardLink,m),b.close()}));b.setEventListeners(),s.addEventListener("click",(()=>{r.reset(),v.open();const e=h.getUserInfo();n.value=e.title,i.value=e.subtitle})),o.addEventListener("click",(()=>{l.reset(),b.open()}))})();