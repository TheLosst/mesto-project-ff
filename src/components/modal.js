// Функция открытия
export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  requestAnimationFrame(() => {
    popup.classList.add("popup_is-opened");
  });
  document.addEventListener("keydown", handleEscClose, { once: true });
  popup.addEventListener("mousedown", handleOverlayClick, { once: true });
}

// Функция закрытия
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 100);
}

// Функция закрытия(ESC)
function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}
