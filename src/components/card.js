import { putLike, deleteLike } from "./api.js";

function getCard(item, userId, removeCard, likeCard, openModalImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeСounter = cardElement.querySelector(".card__like-counter");
  const likeIds = item.likes.map((like) => like._id);

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.id = item["_id"];
  likeСounter.textContent = item.likes.length;

  if (item.owner["_id"] === userId) {
    deleteButton.addEventListener("click", () => {
      removeCard(cardElement, item["_id"]);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      deleteLike(cardElement.id)
        .then((data) => {
          const likeIds = data.likes.map((like) => like._id);
          likeСounter.textContent = likeIds.length;
          likeCard(likeButton);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putLike(cardElement.id)
        .then((data) => {
          const likeIds = data.likes.map((like) => like._id);
          likeСounter.textContent = likeIds.length;
          likeCard(likeButton);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  if (likeIds.includes(userId)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  cardImage.addEventListener("click", function () {
    openModalImage(item);
  });

  return cardElement;
}

function likeCard(item) {
  item.classList.toggle("card__like-button_is-active");
}

export { getCard, likeCard };
