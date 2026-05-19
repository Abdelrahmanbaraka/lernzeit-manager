import { STORAGE_KEYS } from "../utils/storageKeys";

import { getData, saveData } from "./storageService";

export function getLearningSessions() {
  return getData(STORAGE_KEYS.LEARNING_SESSIONS);
}

export function saveLearningSessions(sessions) {
  saveData(STORAGE_KEYS.LEARNING_SESSIONS, sessions);
}