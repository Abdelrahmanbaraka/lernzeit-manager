import mockUsers from "../data/mockUsers";

import { STORAGE_KEYS } from "../utils/storageKeys";

export function login(username, password) {
  const user = mockUsers.find(
    (user) =>
      user.username === username &&
      user.password === password
  );

  if (!user) {
    return null;
  }

  localStorage.setItem(
    STORAGE_KEYS.CURRENT_USER,
    JSON.stringify(user)
  );

  return user;
}

export function logout() {
  localStorage.removeItem(
    STORAGE_KEYS.CURRENT_USER
  );
}

export function getCurrentUser() {
  const user = localStorage.getItem(
    STORAGE_KEYS.CURRENT_USER
  );

  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!getCurrentUser();
}