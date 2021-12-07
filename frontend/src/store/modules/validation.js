const MIN_LENGTH = 6;
const MAX_LENGTH = 255;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const getters = {
  validateLogin() {
    return (loginInput) => {
      const errors = {};
      if (!loginInput.email) {
        errors.emptyEmail = true;
      }
      if (loginInput.email && !EMAIL_REGEX.test(loginInput.email)) {
        errors.invalidEmail = true;
      }
      if (!loginInput.password) {
        errors.emptyPassword = true;
      }
      if (
        loginInput.password &&
        loginInput.password.trim().length < MIN_LENGTH
      ) {
        errors.passwordMinLength = true;
      }
      if (
        loginInput.password &&
        loginInput.password.trim().length > MAX_LENGTH
      ) {
        errors.passwordMaxLength = true;
      }
      if (Object.keys(errors).length) return errors;
      return null;
    };
  },
  validateRegister() {
    return (registerInput) => {
      const errors = {};
      if (!registerInput.email) {
        errors.emptyEmail = true;
      }
      if (registerInput.email && !EMAIL_REGEX.test(registerInput.email)) {
        errors.invalidEmail = true;
      }
      if (!registerInput.firstName) {
        errors.emptyFirstName = true;
      }
      if (!registerInput.lastName) {
        errors.emptyLastName = true;
      }
      if (!registerInput.phoneNumber) {
        errors.emptyPhoneNumber = true;
      }
      if (!registerInput.password) {
        errors.emptyPassword = true;
      }
      if (
        registerInput.password &&
        registerInput.password.trim().length < MIN_LENGTH
      ) {
        errors.passwordMinLength = true;
      }
      if (
        registerInput.password &&
        registerInput.password.trim().length > MAX_LENGTH
      ) {
        errors.passwordMaxLength = true;
      }
      if (!registerInput.confirmPassword) {
        errors.emptyConfirmPassword = true;
      }
      if (
        registerInput.confirmPassword &&
        registerInput.confirmPassword.trim().length < MIN_LENGTH
      ) {
        errors.confirmPasswordMinLength = true;
      }
      if (
        registerInput.confirmPassword &&
        registerInput.confirmPassword.trim().length > MAX_LENGTH
      ) {
        errors.confirmPasswordMaxLength = true;
      }
      if (
        registerInput.password.trim() !== registerInput.confirmPassword.trim()
      ) {
        errors.confirmPasswordNotSamePassword = true;
      }
      if (Object.keys(errors).length) return errors;
      return null;
    };
  },
  validateEmail() {
    return (email) => {
      const errors = {};
      if (!email) {
        errors.emptyEmail = true;
      }
      if (email && !EMAIL_REGEX.test(email)) {
        errors.invalidEmail = true;
      }
      if (Object.keys(errors).length) return errors;
      return null;
    };
  },
  validateText() {
    return (text) => {
      const errors = {};
      if (!text) {
        errors.emptyName = true;
      }
      if (Object.keys(errors).length) return errors;
      return null;
    };
  },
};

export default {
  namespaced: true,
  getters,
};
