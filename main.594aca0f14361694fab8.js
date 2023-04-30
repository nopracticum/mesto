(()=>{"use strict";const e=document.querySelector(".popup_type_image"),t=(e.querySelector(".popup__image"),e.querySelector(".popup__image-name"),document.querySelector(".profile")),s=t.querySelector(".profile__edit-avatar"),i=t.querySelector(".profile__edit-button"),r=document.forms.editProfileForm,n=document.forms.editAvatarForm,a=t.querySelector(".profile__add-button"),o=document.forms.addCardForm;class h{constructor(e,t,s,i,r,n,a){this._name=e.name,this._link=e.link,this._likes=e.likes,this._id=e._id,this._ownerId=e.owner._id,this._myId=s,this._template=t,this._handleCardClick=i,this._handleButtonTrashClick=r,this._deleteLike=a,this._putLike=n,this._cardElement=this._getCardTemplate(),this._buttonTrash=this._cardElement.querySelector(".card__trash-button"),this._cardImage=this._cardElement.querySelector(".card__image"),this._heartCount=this._cardElement.querySelector(".card__like-count"),this._buttonLike=this._cardElement.querySelector(".card__like-button")}_isLiked(){return this._likes.find((e=>e._id===this._myId))}_getCardTemplate(){return document.querySelector(this._template).content.querySelector(".card").cloneNode(!0)}_fillTemplate(){this._cardElement.querySelector(".card__title").textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._isLiked()&&this._buttonLike.classList.add("card__like-button_active"),this._heartCount.textContent=this._likes.length}_setEventListeners(){this._buttonLike.addEventListener("click",(()=>{this._isLiked()?this._deleteLike(this._id):this._putLike(this._id)})),this._ownerId!==this._myId?this._buttonTrash.remove():this._buttonTrash.addEventListener("click",(()=>{this._handleButtonTrashClick(this._id)})),this._cardImage.addEventListener("click",(()=>{this._handleCardClick(this._name,this._link)}))}updateLikes(e){this._likes=e.likes,this._heartCount.textContent=this._likes.length,this._buttonLike.classList.toggle("card__heart-btn_active")}deleteCard(){this._cardElement.remove()}createCard(){return this._fillTemplate(),this._setEventListeners(),this._cardElement}}class l{constructor(e){this._element=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._element.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._element.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&document.querySelector(".popup_opened")&&this.close()}setEventListeners(){this._element.addEventListener("mousedown",(e=>{e.target.classList.contains("popup_opened")&&this.close(),e.target.classList.contains("popup__close-button")&&this.close()}))}}class _ extends l{constructor(e,t){super(e),this._formElement=this._element.querySelector(".popup__form"),this._buttonSubmit=this._formElement.querySelector(".popup__submit-button"),this._textButtonSubmit=this._buttonSubmit.textContent,this._handleSubmit=t,this._inputValues={},this._inputs=Array.from(this._formElement.elements)}_getInputValues(){this._inputs.forEach((e=>{this._inputValues[e.name]=e.value}))}close(){super.close(),this._formElement.reset()}setInputValues(e){this._inputs.forEach((t=>{t.value=e[t.name]}))}setEventListeners(){super.setEventListeners(),this._formElement.addEventListener("submit",(e=>{e.preventDefault(),this._getInputValues(),this._handleSubmit(this._inputValues)}))}renderLoading(e){this._buttonSubmit.textContent=e?"Сохранение...":this._textButtonSubmit}}const d={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonAttribute:"disabled",inputErrorClass:"popup__input_invalid",errorClass:"popup__input-error_active"};class c{constructor(e,t){this._selectorsSet=e,this._form=t,this._buttonSubmit=this._form.querySelector(this._selectorsSet.submitButtonSelector),this._inputsList=Array.from(this._form.querySelectorAll(this._selectorsSet.inputSelector))}_hideInputError(e){const t=this._form.querySelector(`.${e.id}-error`);t.textContent="",t.classList.remove(this._selectorsSet.errorClass),e.classList.remove(this._selectorsSet.inputErrorClass)}_showInputError(e,t){const s=this._form.querySelector(`.${e.id}-error`);s.textContent=t,s.classList.add(this._selectorsSet.errorClass),e.classList.add(this._selectorsSet.inputErrorClass)}_submitBtnState(){this._form.checkValidity()?this._buttonSubmit.removeAttribute(this._selectorsSet.inactiveButtonAttribute):this._buttonSubmit.setAttribute(this._selectorsSet.inactiveButtonAttribute,!0)}_checkInputValidity(e){this._submitBtnState(),e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_setEventListeners(){this._inputsList.forEach((e=>{e.addEventListener("input",(()=>this._checkInputValidity(e)))})),this._form.addEventListener("reset",(()=>{setTimeout((()=>{this._submitBtnState()})),this._inputsList.forEach((e=>{this._form.addEventListener("reset",(()=>this._hideInputError(e)))}))}))}enableValidation(){this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}}function u(e,t){const s=new h(e,"#card",E.getUserId(),((e,t)=>{f.open({name:e,link:t})}),(e=>{b.open(),b.setSubmit((()=>{p.deleteCard(e).then((()=>{s.deleteCard(),b.close()})).catch((e=>{alert(e)}))}))}),(e=>{p.putLike(e).then((e=>{s.updateLikes(e)})).catch((e=>{alert(e)}))}),(e=>{p.deleteLike(e).then((e=>{s.updateLikes(e)})).catch((e=>{alert(e)}))}));t.addItem(s.createCard())}new c(d,r).enableValidation(),new c(d,o).enableValidation(),new c(d,n).enableValidation();const m=new class{constructor(e,t){this._renderer=e,this._container=document.querySelector(t)}renderItems(e){e.reverse().forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}((e=>{u(e,m)}),".cards"),p=new class{constructor(e){this._baseUrl=e.baseUrl,this._headers=e.headers}_checkResponse(e){return e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)}getUserInfo(){return fetch(`${this._baseUrl}/users/me`,{headers:this._headers}).then(this._checkResponse)}editUserInfo(e,t){return fetch(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then(this._checkResponse)}editAvatar(e){return fetch(`${this._baseUrl}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}addNewCard(e,t){return fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}getCardsInfo(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then(this._checkResponse)}deleteCard(e){return fetch(`${this._baseUrl}/cards/${e}`,{method:"DELETE",headers:this._headers})}putLike(e){return fetch(`${this._baseUrl}/cards/likes/${e}`,{method:"PUT",headers:this._headers}).then(this._checkResponse)}deleteLike(e){return fetch(`${this._baseUrl}/cards/likes/${e}`,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-64",headers:{authorization:"0b562ac8-f292-439f-a6fd-a16812416d74","Content-Type":"application/json"}});Promise.all([p.getUserInfo(),p.getCardsInfo()]).then((e=>{let[t,s]=e;E.setUserId(t._id),E.setUserInfo(t.name,t.about),E.setAvatar(t.avatar),m.renderItems(s)})).catch((e=>{alert(e)}));const b=new class extends l{constructor(e){super(e),this._form=this._element.querySelector(".popup__form")}setSubmit(e){this._handleSubmit=e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleSubmit()}))}}(".popup_type_delete");b.setEventListeners();const E=new class{constructor(e){let{name:t,job:s,avatar:i}=e;this._titleElement=document.querySelector(t),this._subTitleElement=document.querySelector(s),this._avatarElement=document.querySelector(i)}setUserId(e){this._id=e}getUserId(){return this._id}getUserInfo(){return{title:this._titleElement.textContent,subtitle:this._subTitleElement.textContent}}setAvatar(e){this._avatarElement.src=e}setUserInfo(e,t){this._titleElement.textContent=e,this._subTitleElement.textContent=t}}({name:".profile__title",job:".profile__subtitle",avatar:".profile__avatar"}),f=new class extends l{constructor(e){super(e),this._image=this._element.querySelector(".popup__image"),this._imageName=this._element.querySelector(".popup__image-name")}open(e){let{name:t,link:s}=e;this._image.src=s,this._image.alt=t,this._imageName.textContent=t,super.open()}}(".popup_type_image");f.setEventListeners();const v=new _(".popup_type_edit-avatar",(e=>{v.renderLoading(!0),p.editAvatar(e.avatarLink).then((e=>{E.setAvatar(e.avatar)})).then((()=>{v.close()})).catch((e=>{alert(e)})).finally((()=>{v.renderLoading(!1)}))}));v.setEventListeners();const L=new _(".popup_type_edit-profile",(e=>{L.renderLoading(!0),p.editUserInfo(e.title,e.subtitle).then((e=>{E.setUserInfo(e.name,e.about)})).then((()=>{L.close()})).catch((e=>{alert(e)})).finally((()=>{L.renderLoading(!1)}))}));L.setEventListeners();const k=new _(".popup_type_add-card",(e=>{k.renderLoading(!0),p.addNewCard(e.cardTitle,e.cardLink).then((e=>{u(e,m)})).then((()=>{k.close()})).catch((e=>{alert(e)})).finally((()=>{k.renderLoading(!1)}))}));k.setEventListeners(),s.addEventListener("click",(()=>{v.open()})),i.addEventListener("click",(()=>{L.open();const e=E.getUserInfo();L.setInputValues(e)})),a.addEventListener("click",(()=>{k.open()}))})();