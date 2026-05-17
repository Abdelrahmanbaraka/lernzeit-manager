import { STORAGE_KEYS } from "../utils/storageKeys";

import {
  getData,
  saveData,
} from "./storageService";

export function getGoals() {
  return getData(STORAGE_KEYS.GOALS);
}

export function saveGoals(goals) {
  saveData(STORAGE_KEYS.GOALS, goals);
}