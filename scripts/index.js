const cardList = document.querySelector('.places__list');

function getCard (item, removeCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);

    return cardElement;
}

function removeCard(evt) {
    evt.target.closest('.places__item').remove();
}

initialCards.forEach((item) => {
    cardList.append(getCard(item, removeCard));
  });
