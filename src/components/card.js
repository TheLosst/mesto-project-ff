export const createCard = (
  cardData,
  deleteCallback,
  likeCallback,
  imagePopupCallback
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  likeButton.addEventListener("click", likeCallback);

  cardImage.addEventListener("click", imagePopupCallback);

  return cardElement;
};

export const renderInitialCards = (initialCards, container) => {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    container.append(cardElement);
  });
};

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLikeButton(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}
