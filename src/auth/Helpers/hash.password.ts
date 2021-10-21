export function encode(string) {
  let number = '0x';
  const length = string.length;
  for (let i = 0; i < length; i++)
    number += string.charCodeAt(i).toString(16);
  return number;
}

export function decode(number) {
  let string = '';
  number = number.slice(2);
  const length = number.length;
  for (let i = 0; i < length;) {
    const code = number.slice(i, i += 2);
    string += String.fromCharCode(parseInt(code, 16));
  }
  return string;
}
