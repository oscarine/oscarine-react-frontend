
export function getFromLocalStorage (key) {
  return JSON.parse(window.localStorage.getItem(key))
}

export function setToLocalStorage (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeFromLocalStorage (key) {
  window.localStorage.removeItem(key)
}
