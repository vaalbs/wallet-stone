export const defaultErrorMessage =
  "Oops, algo de errado aconteceu, tente novamente!";

export const PATTERNS = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[A-Za-z!$%@#£€*?&\u00C0-\u00FF])(?=.*\d)[A-Za-z\d!$%@#£€*?&\u00C0-\u00FF]{8,}$/,
};

export const VALIDATION_MESSAGE = {
  minLength: "Sua senha possui menos que 8 caracteres.",
  pattern: {
    email: "Deve ser um e-mail.",
    password: "Sua senha deve ter letras e números.",
  },
  required: "Campo obrigatório.",
};
