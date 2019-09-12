const validator = require('./validator');

describe(`sanitize`, () => {
  it(`should remove all non-numeric characters`, () => {
    let cpfValue = validator.sanitize("000.000.000-00");
    let randomValue = validator.sanitize("abc1*¨,3");
    let spacesValue = validator.sanitize(" 125 ");
    expect(cpfValue).toEqual("00000000000");
    expect(randomValue).toEqual("13");
    expect(spacesValue).toEqual("125");
  });

  it(`should return empty string when given value has invalid type`, () => {
    let objectValue = validator.sanitize({ random: "value" });
    let arrValue = validator.sanitize([1, 1]);
    let undefinedValue = validator.sanitize([1, 1]);
    [objectValue, arrValue, undefinedValue].map(item =>
      expect(item).toEqual("")
    );
  });
});

describe(`cpf`, () => {
  it(`should be invalid when given cpf with all zeroes characters`, () => {
    let isValid = validator.cpf(validator.constants.CPF_ONLY_ZEROES);
    expect(isValid).toEqual(false);
  });

  it(`should be invalid when given input with incorrect length (11 or 14)`, () => {
    expect(validator.cpf("1263251458720")).toEqual(false);
    expect(validator.cpf("1263")).toEqual(false);
    expect(validator.cpf("96647011064")).toEqual(true);
    expect(validator.cpf("327.332.930-01")).toEqual(true);
  })

  it(`should fail when given invalid cpf inputs`, () => {
    expect(validator.cpf("351.346.180-12")).toEqual(false);
    expect(validator.cpf("84755486085")).toEqual(false);
  })

  it(`should pass when given valid cpf inputs`, () => {
    expect(validator.cpf("351.546.180-92")).toEqual(true);
    expect(validator.cpf("09555486085")).toEqual(true);
  })
});