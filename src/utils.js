export function randomDigits(numberOfDigits) {
  return Math.floor(Math.random() * 10 ** numberOfDigits);
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
