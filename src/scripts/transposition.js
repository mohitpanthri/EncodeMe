// Function to perform Transposition Cipher encryption
function transpositionEncrypt(text, key) {
  const keyLength = key.length;
  const textLength = text.length;
  const rows = Math.ceil(textLength / keyLength);
  const matrix = new Array(rows)
    .fill("")
    .map(() => new Array(keyLength).fill(""));

  // Fill the matrix with the plaintext
  let textIndex = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < keyLength; j++) {
      if (textIndex < textLength) {
        matrix[i][j] = text[textIndex];
        textIndex++;
      }
    }
  }

  // Sort the columns based on the order of characters in the key
  const sortedKey = key.split("").sort();
  const keyOrder = key.split("").map((char) => sortedKey.indexOf(char));
  const encryptedTextArr = [];

  for (let i = 0; i < keyLength; i++) {
    const col = keyOrder.indexOf(i);
    for (let j = 0; j < rows; j++) {
      encryptedTextArr.push(matrix[j][col]);
    }
  }

  return encryptedTextArr.join("");
}

// Function to perform Transposition Cipher decryption
function transpositionDecrypt(text, key) {
  const keyLength = key.length;
  const textLength = text.length;
  const rows = Math.ceil(textLength / keyLength);
  const matrix = new Array(rows)
    .fill("")
    .map(() => new Array(keyLength).fill(""));
  const colsInLastRow = textLength % keyLength || keyLength;
  const emptyCells = rows * keyLength - textLength;

  // Arrange the columns based on the key order
  const keyOrder = key
    .split("")
    .map((char, index) => [char, index])
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((item) => item[1]);

  let textIndex = 0;
  for (let i = 0; i < keyLength; i++) {
    const col = keyOrder.indexOf(i);
    for (let j = 0; j < rows; j++) {
      if ((j === rows - 1 && col >= colsInLastRow) || textIndex >= textLength) {
        // Skip filling cells in the last row if they are empty
        continue;
      }

      matrix[j][col] = text[textIndex];
      textIndex++;
    }
  }

  // Read the plaintext from the matrix
  const decryptedTextArr = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < keyLength; j++) {
      decryptedTextArr.push(matrix[i][j]);
    }
  }

  return decryptedTextArr.join("");
}

// Exporting the functions
export { transpositionEncrypt, transpositionDecrypt };
