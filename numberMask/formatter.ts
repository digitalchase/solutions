/**
 * @example
 * numberMask('89132002211', '+7(___)___-__-__')
 */
export const numberMask = (value: string, mask: string) => {
  let counter = 0;
  const def = mask.replace(/\D/g, '');
  let val = value.replace(/\D/g, '');

  if (def.length >= val.length) {
    val = def;
  }

  return (
    mask.replace(/./g, (char) => (
      /[_\d]/.test(char) && counter < val.length
        ? val.charAt(counter++)
        : counter >= val.length
        ? ''
        : char
    ))
  );
};
