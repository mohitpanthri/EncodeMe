function vigenereEncrypt(text, keyword) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const textLength = text.length;
  const keywordLength = keyword.length;
  let encryptedText = "";

  for (let i = 0; i < textLength; i++) {
    const char = text[i];
    if (char === " ") {
      encryptedText += " ";
      continue;
    }

    const keyChar = keyword[i % keywordLength];
    const keyIndex = alphabet.indexOf(keyChar);
    const charIndex = alphabet.indexOf(char);

    if (charIndex === -1) {
      encryptedText += char;
      continue;
    }

    const shift = keyIndex;
    const newIndex = (charIndex + shift + 26) % 26;
    encryptedText += alphabet[newIndex];
  }

  return encryptedText;
}

function vigenereDecrypt(text, keyword) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const textLength = text.length;
  const keywordLength = keyword.length;
  let decryptedText = "";

  for (let i = 0; i < textLength; i++) {
    const char = text[i];
    if (char === " ") {
      decryptedText += " ";
      continue;
    }

    const keyChar = keyword[i % keywordLength];
    const keyIndex = alphabet.indexOf(keyChar);
    const charIndex = alphabet.indexOf(char);

    if (charIndex === -1) {
      decryptedText += char;
      continue;
    }

    const shift = (26 - keyIndex) % 26;
    const newIndex = (charIndex + shift) % 26;
    decryptedText += alphabet[newIndex];
  }

  return decryptedText;
}

// Exporting the functions
export { vigenereEncrypt, vigenereDecrypt };
