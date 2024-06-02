// Function to perform vigenere Cipher encryption
function vigenereEncrypt(plainText, keyword) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  plainText = plainText.toUpperCase().replace(/\s/g, "");
  keyword = keyword.toUpperCase().replace(/\s/g, "");
  const textLength = plainText.length;
  const keywordLength = keyword.length;
  let encryptedText = "";

  for (let i = 0; i < textLength; i++) {
    const char = plainText[i];
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

// Function to perform vigenere Cipher decryption
function vigenereDecrypt(cipherText, keyword) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  cipherText = cipherText.toUpperCase().replace(/\s/g, "");
  keyword = keyword.toUpperCase().replace(/\s/g, "");
  const textLength = cipherText.length;
  const keywordLength = keyword.length;
  let decryptedText = "";
  // let i = 0;

  for (let i = 0; i < textLength; i++) {
    const char = cipherText[i];
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
