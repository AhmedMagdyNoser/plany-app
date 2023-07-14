export function randomDigits(numberOfDigits) {
  return Math.floor(Math.random() * 10 ** numberOfDigits);
}

export function formatDateAndTime(dateAndTime) {
  return new Date(dateAndTime).toLocaleDateString("ar-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("ar-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
