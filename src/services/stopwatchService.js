import { STORAGE_KEYS } from "../utils/storageKeys";

import {
  getStoredValue,
  removeData,
  saveStoredValue,
} from "./storageService";

export function getActiveStopwatch() {
  return getStoredValue(STORAGE_KEYS.ACTIVE_STOPWATCH, null);
}

export function saveActiveStopwatch(stopwatch) {
  saveStoredValue(STORAGE_KEYS.ACTIVE_STOPWATCH, stopwatch);
}

export function clearActiveStopwatch() {
  removeData(STORAGE_KEYS.ACTIVE_STOPWATCH);
}
