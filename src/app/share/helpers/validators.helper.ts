export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const faxRegex = /^[+]?[0-9()\-\s]*$/;
export const phoneRegex = /^[+]?[0-9()\-\s]*$/;

function isEmailValid(email: string): boolean {
  return emailRegex.test(email);
}

function isFaxValid(fax: string): boolean {
  return faxRegex.test(fax);
}

function isPhoneValid(phone: string): boolean {
  return phoneRegex.test(phone);
}

export default {
  emailRegex,
  faxRegex,
  phoneRegex,
  isEmailValid,
  isFaxValid,
  isPhoneValid,
};
