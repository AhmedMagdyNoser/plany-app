export function randomDigits(numberOfDigits) {
  return Math.floor(Math.random() * 10 ** numberOfDigits);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("ar-US", {
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

export function formatDateAndTime(dateAndTime) {
  return new Date(dateAndTime).toLocaleDateString("ar-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatDateAndTimeEn(dateAndTime) {
  const date = new Date(dateAndTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours();
  const isPM = hours >= 12;
  const formattedHours = String(hours % 12 || 12).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = isPM ? "PM" : "AM";
  return `${year} - ${month} - ${day} | ${formattedHours}:${minutes} ${ampm}`;
}
