export interface Validation {
  validEmail: boolean;
  validAmount: boolean;
  validPhone: boolean;
}

export const initValidation = {
  validEmail: true,
  validAmount: true,
  validPhone: true
}

export const isValidEmail = (email: string) => {
  
  if (email === "") {
    return false
  }

  const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (result === null) {
    return false;
  }
  return true;
};

export const isValidAmount = (min: number, max: number, amount: string) => {
  const parsedAmount = parseInt(amount, 10);

  return amount !== "" && parsedAmount >= min && parsedAmount <= max;
};

export const isValidPhone = (phone: string) => {
  return phone.length === 10 && /^\d+$/.test(phone);
};

export const cleanPhoneNumber = (phoneNumber: string) => {

  // Remove spaces
  if (phoneNumber?.length >= 10) {
    const parsedPhone = phoneNumber.replace(/\D/g, '');
    const fixed = parsedPhone.replaceAll(' ', '').slice(-10);
    return fixed;
  }
  return phoneNumber;
}
