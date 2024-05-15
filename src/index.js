import "./pages/index.css";
import {
  profileName,
  profileJob,
  profileForm,
  avatarForm,
  nameInput,
  jobInput,
  profileEditBtn,
  profileAddBtn,
  profileImage,
  closeButtons,
  popups,
  popupEdit,
  popupAvatar,
  popupCard,
  formAddCard,
  placeName,
  imageUrl,
  popupImage,
  popupImg,
  popupButton,
  popupCaption,
  cardList,
  validationConfig,
} from "./utils/constants.js";
import { openModal, closeModal } from "./components/modal.js";
import { getCard, likeCard, removeCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserData,
  updateUserData,
  updateAvatar,
  createCard,
} from "./components/api.js";
import { renderLoading, handleSubmit } from "./utils/utils.js";

let profileId = "";

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
  .catch(console.error);

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

profileAddBtn.addEventListener("click", function () {
  clearValidation(formAddCard, validationConfig);
  openModal(popupCard);
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

  function handleProfileRequest() {
    return updateUserData(nameInput.value, jobInput.value)
      .then((userData) => {
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        closeModal(popupEdit);
      })
      .catch((error) => console.log("Не загрузились данные профиля, ошибка:", error));
  }

    handleSubmit(handleProfileRequest, evt);
  }

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileImage.addEventListener("click", function () {
  openModal(popupAvatar);
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
});

// Функция редактирования аватара

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  function handleAvatarRequest() {
    return updateAvatar(avatarForm.avatar.value)
    .then((profileData) => {
      profileImage.style.backgroundImage = `url(${profileData.avatar})`;
      closeModal(popupAvatar); 
    })
    .catch(console.error);
  }
    handleSubmit(handleAvatarRequest, evt);
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Функция добавления карточки

function addCard(evt) {
  evt.preventDefault();

  function makeRequest() {
    return createCard(placeName.value, imageUrl.value)
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
      .catch(console.error);
  }
  handleSubmit(makeRequest, evt);
}

formAddCard.addEventListener("submit", addCard);

enableValidation(validationConfig);
