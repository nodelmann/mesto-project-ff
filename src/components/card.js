function getCard(item, removeCard, likeCard, openModalImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  deleteButton.addEventListener("click", removeCard);
  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", function () {
    openModalImage(item);
  });

  return cardElement;
}

function removeCard(evt) {
  evt.target.closest(".places__item").remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { getCard, removeCard, likeCard };
