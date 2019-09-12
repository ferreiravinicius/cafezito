const VALID_INPUT_TYPES = ["string", "number"];
const EMPTY_STRING = "";
const CPF_ONLY_ZEROES = "00000000000";

const sanitize = value => {
  if (hasValidType(value)) {
    return value.replace(/\D/g, EMPTY_STRING);
  }
  return EMPTY_STRING;
};

const hasValidType = value => {
  let type = typeof value;
  return VALID_INPUT_TYPES.includes(type);
};

const cpf = value => {
  const cleanCpf = sanitize(value);
  if (cleanCpf === CPF_ONLY_ZEROES) return false;
  if (cleanCpf.length !== 11) return false;

  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    let digit = Number(cleanCpf.substring(i - 1, i));
    sum = sum + digit * (11 - i);
  }

  let rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11)
    rest = 0;
  if (rest !== Number(cleanCpf.substring(9, 10)))
    return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    let digit = Number(cleanCpf.substring(i - 1, i));
    sum = sum + digit * (12 - i);
  }

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11)
    rest = 0;
  if (rest !== Number(cleanCpf.substring(10, 11)))
    return false;

  return true;
};

module.exports = { sanitize, cpf, constants: { EMPTY_STRING, CPF_ONLY_ZEROES } };

/**
 * var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
 *
 */
