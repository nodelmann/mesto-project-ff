import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { getCard, removeCard, likeCard } from "./components/card.js";

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const formElement = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupClose = document.querySelectorAll(".popup__close");

const popupCard = document.querySelector(".popup_type_new-card");
const formAddCard = document.forms["new-place"];
const placeName = formAddCard.elements["place-name"];
const imageUrl = formAddCard.elements["link"];

const popupImage = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const cardList = document.querySelector(".places__list");

initialCards.forEach((item) => {
  cardList.append(getCard(item, removeCard, likeCard, openModalImage));
});

function openModalImage(img) {
  popupCaption.textContent = img.name;
  popupImg.src = img.link;
  popupImg.alt = img.name;
  openModal(popupImage);
}

profileEditBtn.addEventListener("click", function () {
  openModal(popupEdit);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
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

popupClose.forEach((item) => {
  const popup = item.closest(".popup");
  item.addEventListener("click", () => {
    closeModal(popup);
  });
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closeModal(popupEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

function addCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeName.value,
    link: imageUrl.value,
  };
  cardList.prepend(getCard(newCard, removeCard, likeCard, openModalImage));
  closeModal(popupCard);
  formAddCard.reset();
}

formAddCard.addEventListener("submit", addCard);