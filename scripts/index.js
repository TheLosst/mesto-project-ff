// @todo: Темплейт карточки 

// @todo: DOM узлы 

// @todo: Функция создания карточки 

// @todo: Функция удаления карточки 

// @todo: Вывести карточки на страницу 


const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');


function createCard(cardData, deleteCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  
  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });

  cardImage.addEventListener('click', () => {
    openImagePopup(cardData.link, cardData.name);
  });
  
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.append(cardElement);
  });
}

function openImagePopup(imageUrl, imageCaption) {
  popupImage.src = imageUrl;
  popupImage.alt = imageCaption;
  popupCaption.textContent = imageCaption;
  imagePopup.classList.add('popup_is-opened');
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_is-opened');
}

closeImagePopupButton.addEventListener('click', closeImagePopup);

renderInitialCards();