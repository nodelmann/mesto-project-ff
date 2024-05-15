export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__description");
export const profileForm = document.forms["edit-profile"];
export const avatarForm = document.forms["edit-avatar"];
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_description");
export const profileEditBtn = document.querySelector(".profile__edit-button");
export const profileAddBtn = document.querySelector(".profile__add-button");
export const profileImage = document.querySelector(".profile__image");
export const closeButtons = document.querySelectorAll(".popup__close");
export const popups = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const popupCard = document.querySelector(".popup_type_new-card");
export const formAddCard = document.forms["new-place"];
export const placeName = formAddCard.elements["place-name"];
export const imageUrl = formAddCard.elements["link"];
export const popupImage = document.querySelector(".popup_type_image");
export const popupImg = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");
export const cardList = document.querySelector(".places__list");
export const popupButton = document.querySelector(".popup__button");

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};