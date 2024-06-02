// Function to perform Affine Cipher encryption
function affineEncrypt(text, key1, key2) {
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

    const newIndex = (key1 * charIndex + key2) % 26;
    encryptedText += alphabet[newIndex];
  }

  return encryptedText;
}

// Function to perform Affine Cipher decryption
function affineDecrypt(text, key1, key2) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const textLength = text.length;
  const modInverseA = modInverse(key1, 26); // Calculate the modular inverse of 'a'

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

    const newIndex = (modInverseA * (charIndex - key2 + 26)) % 26;
    decryptedText += alphabet[newIndex];
  }

  return decryptedText;
}

// Function to calculate the modular inverse
function modInverse(a, m) {
  let [x, y, gcd] = extendedEuclidean(a, m);
  if (gcd !== 1) {
    return null; // Modular inverse does not exist
  } else {
    x = ((x % m) + m) % m; // Ensure x is positive
    return x;
  }
}

// Function to perform extended euclidean algorithm
function extendedEuclidean(a, b) {
  if (b === 0) {
    return [1, 0, a];
  }

  const [x1, y1, gcd] = extendedEuclidean(b, a % b);
  const x = y1;
  const y = x1 - Math.floor(a / b) * y1;
  return [x, y, gcd];
}

// Exporting the functions
export { affineEncrypt, affineDecrypt };
