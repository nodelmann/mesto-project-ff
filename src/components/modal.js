function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 1); 
  document.addEventListener("keydown", closeEsc);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closeModal(popupOpen);
  }
}

export { openModal, closeModal };