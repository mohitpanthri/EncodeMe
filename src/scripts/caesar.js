// Function to perform caesar encryption
export const caesarEncrypt = (text, shift) => {
  text = text.toUpperCase().replace(/\s/g, "");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const modValue = alphabet.length;
  const encryptedChars = [];

  for (let char of text) {
    if (char === " ") {
      encryptedChars.push(" ");
      continue;
    }

    const charIndex = alphabet.indexOf(char);
    if (charIndex === -1) {
      encryptedChars.push(char);
      continue;
    }

    const newIndex = (charIndex + shift + modValue) % modValue;
    encryptedChars.push(alphabet[newIndex]);
  }

  return encryptedChars.join("");
};

// Exporting the functions
export function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, -shift);
}
