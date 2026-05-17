export function getData(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}