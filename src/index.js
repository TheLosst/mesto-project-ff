import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, deleteCard, toggleLikeButton } from "./components/card.js";

// DOM узлы
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_description");
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");
const profileEditPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImg = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");
const newCardPopup = document.querySelector(".popup_type_new-card");

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Функция для вывода карточек на страницу
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      toggleLikeButton,
      openImagePopup
    );
    placesList.appendChild(cardElement);
  });
}

// Функция для добавления обработчиков событий для открытия попапов
function addPopupOpenListeners() {
  editButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openModal(profileEditPopup);
  });

  addButton.addEventListener("click", () => openModal(newCardPopup));
}

// Функция для добавления обработчика события для формы добавления карточки
function addNewCardFormListener() {
  newCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    const cardElement = createCard(
      cardData,
      deleteCard,
      toggleLikeButton,
      openImagePopup
    );
    placesList.prepend(cardElement);
    closeModal(newCardPopup);
    newCardForm.reset();
  });
}

// Функция для добавления обработчиков событий для закрытия попапов
function addClosePopupListeners() {
  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const popup = event.target.closest(".popup");
      closeModal(popup);
    });
  });
}

// Функция для добавления обработчика события для формы редактирования профиля
function addEditFormListener() {
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closeModal(profileEditPopup);
  });
}

// Вызов функций для добавления обработчиков событий
renderInitialCards();
addPopupOpenListeners();
addNewCardFormListener();
addClosePopupListeners();
addEditFormListener();

// Функция открытия попапа с изображением
function openImagePopup(event) {
  imagePopupImg.src = event.target.src;
  imagePopupImg.alt = event.target.alt;
  imagePopupCaption.textContent = event.target.alt;
  openModal(imagePopup);
}
