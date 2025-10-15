export const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  ' ': '/'
};

export const validateInput = (text: string): boolean => {
  const validPattern = /^[A-Za-z0-9\s]*$/;
  return validPattern.test(text);
};

export const textToMorse = (text: string): string => {
  return text
    .toUpperCase()
    .split('')
    .map(char => MORSE_CODE_MAP[char] || '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};
