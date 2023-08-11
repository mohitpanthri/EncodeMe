// Function to perform Multiplicative Cipher encryption
function multiplicativeEncrypt(text, key) {
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

    const newIndex = (charIndex * key) % 26;
    encryptedText += alphabet[newIndex];
  }

  return encryptedText;
}

// Function to perform Multiplicative Cipher decryption
function multiplicativeDecrypt(text, key) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const textLength = text.length;
  const modInverseKey = modInverse(key, 26); // Calculate the modular inverse of the key

  let decryptedText = "";

  for (let i = 0; i < textLength; i++) {
    const char = text[i];
    if (char === " ") {
      decryptedText += " ";
      continue;
    }

    const charIndex = alphabet.indexOf(char);
    if (charIndex === -1) {
      decryptedText += char;
      continue;
    }

    const newIndex = (modInverseKey * charIndex + 26) % 26;
    decryptedText += alphabet[newIndex];
  }

  return decryptedText;
}

// Function to calculate the modular inverse
function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return -1; // Return -1 if modular inverse doesn't exist
}

// Exporting the functions
export { multiplicativeEncrypt, multiplicativeDecrypt };
