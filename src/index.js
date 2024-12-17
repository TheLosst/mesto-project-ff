import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, deleteCard, toggleLikeButton } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUser,
  editProfile,
  addCard,
  deleteCardAPI,
  updateAvatar,
} from "./components/api.js";
// DOM элементы
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
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
const avatarOverlay = document.querySelector(".profile__image-overlay");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.querySelector('.popup__form[name="change-avatar"]');
const avatarInput = document.querySelector("#avatar-url");
let profileId = null;

// Получение информации о пользователе и обновление профиля
async function getUserInfo() {
  const user = await getUser();
  profileName.textContent = user.name;
  profileAbout.textContent = user.about;
  profileImage.src = user.avatar;
  profileId = user._id;
}

// Загрузка начальных карточек и информации о пользователе
async function loadCards() {
  try {
    await getUserInfo();
    const cards = await getInitialCards();
    cards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        handleCardDelete,
        toggleLikeButton,
        openImagePopup,
        profileId
      );
      placesList.append(cardElement);
    });
  } catch (err) {
    console.error(err);
  }
}

function setupPopupEventListeners() {
  // Обработчики событий для открытия попапов
  editButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    openModal(profileEditPopup);
    clearValidation(profileEditPopup);
  });

  addButton.addEventListener("click", () => {
    openModal(newCardPopup);
    clearValidation(newCardPopup);
  });
}

// Обработчик события для добавления новой карточки
function handleNewCardSubmit(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  const initialText = submitButton.textContent;
  (async () => {
    try {
      submitButton.textContent = "Сохранение...";
      submitButton.disabled = true;
      const cardData = await addCard(cardNameInput.value, cardLinkInput.value);
      const cardElement = createCard(
        cardData,
        handleCardDelete,
        toggleLikeButton,
        openImagePopup,
        profileId
      );
      placesList.prepend(cardElement);
      closeModal(newCardPopup);
      newCardForm.reset();
    } catch (err) {
      console.error(err);
    } finally {
      submitButton.textContent = initialText;
      submitButton.disabled = false;
    }
  })();
}

newCardForm.addEventListener("submit", handleNewCardSubmit);

// Обработчики событий для закрытия попапов
function setupCloseButtonListeners() {
  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const popup = event.target.closest(".popup");
      closeModal(popup);
    });
  });
}

// Обработчик события для редактирования профиля
function handleProfileEditSubmit(event) {
  event.preventDefault();
  const submitButton = event.submitter;
  const initialText = submitButton.textContent;
  (async () => {
    try {
      submitButton.textContent = "Сохранение...";
      submitButton.disabled = true;
      const user = await editProfile(nameInput.value, aboutInput.value);
      profileName.textContent = user.name;
      profileAbout.textContent = user.about;
      closeModal(profileEditPopup);
    } catch (err) {
      console.error("Ошибка при обновлении профиля:", err);
    } finally {
      submitButton.textContent = initialText;
      submitButton.disabled = false;
    }
  })();
}

editForm.addEventListener("submit", handleProfileEditSubmit);

// Функция для открытия попапа с изображением
function openImagePopup(event) {
  imagePopupImg.src = event.target.src;
  imagePopupImg.alt = event.target.alt;
  imagePopupCaption.textContent = event.target.alt;

  openModal(imagePopup);
}

// Функция для обработки удаления карточки
async function handleCardDelete(event, cardId) {
  const cardElement = event.target.closest(".card");
  try {
    await deleteCardAPI(cardId);
    deleteCard(cardElement);
  } catch (err) {
    console.error(err);
  }
}

// Обработчик события для открытия попапа аватара
function setupAvatarPopupListener() {
  avatarOverlay.addEventListener("click", () => {
    openModal(avatarPopup);
    clearValidation(avatarPopup);
  });

  // Обработчик события для обновления аватара
  avatarForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = event.submitter;
    const initialText = submitButton.textContent;

    try {
      submitButton.textContent = "Сохранение...";
      submitButton.disabled = true;

      const data = await updateAvatar(avatarInput.value);
      profileImage.src = data.avatar;
      closeModal(avatarPopup);
      avatarForm.reset();
    } catch (err) {
      console.error(err);
    } finally {
      submitButton.textContent = initialText;
      submitButton.disabled = false;
    }
  });
}

// Включение валидации форм
loadCards();
setupPopupEventListeners();
setupCloseButtonListeners();
setupAvatarPopupListener();
enableValidation();
