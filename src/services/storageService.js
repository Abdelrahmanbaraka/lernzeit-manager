import { STORAGE_KEYS } from "../utils/storageKeys";

function getCurrentUsername() {
  const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);

  if (!currentUser) {
    return "guest";
  }

  try {
    const parsedUser = JSON.parse(currentUser);

    return parsedUser.username || "guest";
  } catch {
    return "guest";
  }
}

function getUserScopedKey(key) {
  if (key === STORAGE_KEYS.CURRENT_USER) {
    return key;
  }

  const username = getCurrentUsername();

  return `${username}_${key}`;
}

export function getData(key) {
  const scopedKey = getUserScopedKey(key);

  const data = localStorage.getItem(scopedKey);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveData(key, data) {
  const scopedKey = getUserScopedKey(key);

  localStorage.setItem(scopedKey, JSON.stringify(data));
}

export function getStoredValue(key, fallbackValue = null) {
  const scopedKey = getUserScopedKey(key);

  const data = localStorage.getItem(scopedKey);

  if (!data) {
    return fallbackValue;
  }

  try {
    return JSON.parse(data);
  } catch {
    return fallbackValue;
  }
}

export function saveStoredValue(key, data) {
  const scopedKey = getUserScopedKey(key);

  localStorage.setItem(scopedKey, JSON.stringify(data));
}

export function removeData(key) {
  const scopedKey = getUserScopedKey(key);

  localStorage.removeItem(scopedKey);
}
