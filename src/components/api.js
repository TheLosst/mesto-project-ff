const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "9ff81e1b-4642-42cc-b2d8-92873597b433",
    "Content-Type": "application/json",
  },
};

async function fetchData(url, options = {}) {
  const res = await fetch(url, {
    headers: config.headers,
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }
  return await res.json();
}

export async function getInitialCards() {
  return fetchData(`${config.baseUrl}/cards`);
}

export async function getUser() {
  return fetchData(`${config.baseUrl}/users/me`);
}

export async function editProfile(name, about) {
  return fetchData(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });
}

export async function addCard(name, link) {
  return fetchData(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });
}

export async function deleteCardAPI(cardId) {
  return fetchData(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
  });
}

export async function addLike(cardId) {
  return fetchData(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
  });
}

export async function removeLike(cardId) {
  return fetchData(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
  });
}

export async function updateAvatar(avatarUrl) {
  return fetchData(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({ avatar: avatarUrl }),
  });
}
