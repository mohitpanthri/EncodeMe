export function caesarEncrypt(text, shift) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const textLength = text.length;
  let encryptedText = "";

  for (let i = 0; i < textLength; i++) {
    const char = text[i];
    if (char === " ") {
      encryptedText += " ";
      continue;
    }

    const charIndex = alphabet.indexOf(char);
    if (charIndex === -1) {
      encryptedText += char;
      continue;
    }

    const newIndex = (charIndex + shift + 26) % 26;
    encryptedText += alphabet[newIndex];
  }

  return encryptedText;
}

// Exporting the functions
export function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, -shift);
}
