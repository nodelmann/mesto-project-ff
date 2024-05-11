import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { getCard, likeCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserData,
  updateUserData,
  updateAvatar,
  createCard,
  deleteCard,
} from "./components/api.js";

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileForm = document.forms["edit-profile"];
const avatarForm = document.forms["edit-avatar"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileImage = document.querySelector(".profile__image");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupCard = document.querySelector(".popup_type_new-card");
const formAddCard = document.forms["new-place"];
const placeName = formAddCard.elements["place-name"];
const imageUrl = formAddCard.elements["link"];
const popupImage = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const cardList = document.querySelector(".places__list");
let profileId = "";
const popupButton = document.querySelector(".popup__button");
const popupDelete = document.querySelector(".popup_type_delete_card");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function openModalImage(img) {
  popupCaption.textContent = img.name;
  popupImg.src = img.link;
  popupImg.alt = img.name;
  openModal(popupImage);
}

Promise.all([getInitialCards(), getUserData()])
  .then(([initialCards, profileData]) => {
    profileId = profileData._id;
    profileName.textContent = profileData.name;
    profileJob.textContent = profileData.about;
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;

    initialCards.forEach((item) => {
      cardList.append(
        getCard(item, profileId, removeCard, likeCard, openModalImage)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

profileAddBtn.addEventListener("click", function () {
  openModal(popupCard);
});

popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(evt.target);
    }
  });
});

closeButtons.forEach((item) => {
  const popup = item.closest(".popup");
  item.addEventListener("click", () => {
    closeModal(popup);
  });
});

profileEditBtn.addEventListener("click", function () {
  openModal(popupEdit);
  clearValidation(profileForm, validationConfig);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
});

// Функция редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const buttonText = popupButton.textContent;
  popupButton.textContent = "Сохранение...";

  updateUserData(nameInput.value, jobInput.value)
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileJob.textContent = profileData.about;
      closeModal(popupEdit);
    })
    .catch((error) => {
      console.log("Ошибка загрузки данных профиля:", error);
    })
    .finally(() => (popupButton.textContent = buttonText));
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileImage.addEventListener("click", function () {
  openModal(popupAvatar);
  clearValidation(profileForm, validationConfig);
});

// Функция редактирования аватара

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const buttonText = popupButton.textContent;
  popupButton.textContent = "Сохранение...";

  updateAvatar(avatarForm.avatar.value)
    .then((profileData) => {
      profileImage.style.backgroundImage = `url(${profileData.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((error) => {
      console.log("Ошибка изменения аватара:", error);
    })
    .finally(() => (popupButton.textContent = buttonText));
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Функция добавления карточки

function addCard(evt) {
  evt.preventDefault();

  const buttonText = popupButton.textContent;
  popupButton.textContent = "Сохранение...";

  createCard(placeName.value, imageUrl.value)
    .then((cards) => {
      const newCard = getCard(
        cards,
        profileId,
        removeCard,
        likeCard,
        openModalImage
      );
      cardList.prepend(newCard);
      closeModal(popupCard);
      formAddCard.reset();
    })
    .catch((error) => {
      console.log("Ошибка добавления карточки:", error);
    })
    .finally(() => (popupButton.textContent = buttonText));
}

formAddCard.addEventListener("submit", addCard);

// Функция удаления карточки

function removeCard(card, cardId) {
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((error) => {
      console.log("Карточка не удалилась", error);
    });
}

enableValidation(validationConfig);
