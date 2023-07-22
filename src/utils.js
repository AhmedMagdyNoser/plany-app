export function randomDigits(numberOfDigits) {
  return Math.floor(Math.random() * 10 ** numberOfDigits);
}

export function findIndexById(array, id) {
  return array.findIndex((item) => item.id === id);
}

export function findObjectById(array, id) {
  return array.find((item) => item.id === id);
}

export function excludeObjectById(array, id) {
  return array.filter((item) => item.id !== id);
}

export function formatDate(date, language) {
  return new Date(date).toLocaleDateString(`${language}-US`, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatedCurrentDate(language) {
  return new Date().toLocaleDateString(`${language}-US`, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateAndTime(dateAndTime, language) {
  return new Date(dateAndTime).toLocaleDateString(`${language}-US`, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatedCurrentDateAndTime(language) {
  return new Date().toLocaleDateString(`${language}-US`, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function getDistanceFromTop(element) {
  return element.getBoundingClientRect().top + window.pageYOffset;
}

export function checkIfOnScreen(element, ratio) {
  // const distanceFromTop = element.getBoundingClientRect().top + window.pageYOffset;
  if (element && window.pageYOffset + window.innerHeight * (ratio || 1) > getDistanceFromTop(element)) {
    return true;
  }
}
