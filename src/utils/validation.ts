const EMAIL_PART_REGEX = /[a-zA-Z_\d]([a-zA-Z_\d.-]*[a-zA-Z_\d])?/;

export const validationRegex = {
  name: /^[^0-9 !@#$%^&*()_+\-={}[\]\\|'";:/?.>,<].*/,
  email: new RegExp(`^${EMAIL_PART_REGEX.source}@${EMAIL_PART_REGEX.source}\\.[a-zA-Z0-9]{2,}$`),
  password: /^.{8,}$/,
};

export const inputFieldsInstructions = {
  name: "Name should not start with a number or special character.",
  email: "Enter a valid email address.",
  password: "Password must be at least 8 characters long.",
};
