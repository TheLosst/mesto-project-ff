// @todo: Темплейт карточки 

// @todo: DOM узлы 

// @todo: Функция создания карточки 

// @todo: Функция удаления карточки 

// @todo: Вывести карточки на страницу 

// Первый случайно отправил, думал, что делал коммиты, но увы...
// Коммиты сделаные после отправки не подтянулись((
// Попробуем еще раз


const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');
const body = document.body;

const profileAddButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');
const closeNewCardPopupButton = newCardPopup.querySelector('.popup__close');




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
  disableScroll();
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_is-opened');
  enableScroll();
}

function disableScroll() {
  body.style.overflow = 'hidden';
}

function enableScroll() {
  body.style.overflow = '';
}

function openImagePopup(imageUrl, imageCaption) {
  popupImage.src = imageUrl;
  popupImage.alt = imageCaption;
  popupCaption.textContent = imageCaption;
  openPopup(imagePopup);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };
  const cardElement = createCard(cardData, deleteCard);
  placesList.prepend(cardElement);
  closePopup(newCardPopup);
  newCardForm.reset();
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  disableScroll();
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  enableScroll();
}

closeImagePopupButton.addEventListener('click', () => closePopup(imagePopup));
closeNewCardPopupButton.addEventListener('click', () => closePopup(newCardPopup));
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
profileAddButton.addEventListener('click', () => openPopup(newCardPopup));

renderInitialCards();