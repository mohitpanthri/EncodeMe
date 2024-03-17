// Function to perform Transposition Cipher encryption
function transpositionEncrypt(plainText, key) {
  let cipherText = "";

  // Track key indices for column arrangement
  let keyIndex = 0;

  // Calculate the length of the plaintext
  const textLength = plainText.length;

  // Convert the plaintext and key into arrays
  const textArray = Array.from(plainText);
  const sortedKey = Array.from(key).sort();

  // Calculate the number of columns in the matrix
  const columns = key.length;

  // Calculate the maximum number of rows in the matrix
  const rows = Math.ceil(textLength / columns);

  // Create a matrix and insert the message row-wise
  const matrix = [];
  let currentIndex = 0;
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      if (currentIndex < textArray.length) {
        row.push(textArray[currentIndex]);
        currentIndex++;
      } else {
        row.push(""); // Replace empty spaces with empty string
      }
    }
    matrix.push(row);
  }

  // Read the matrix column-wise using the sorted key
  for (let i = 0; i < columns; i++) {
    const currentKeyIndex = key.indexOf(sortedKey[keyIndex]);
    for (const row of matrix) {
      cipherText += row[currentKeyIndex];
    }
    keyIndex++;
  }

  return cipherText;
}

// Function to perform Transposition Cipher decryption
function transpositionDecrypt(cipherText, key) {
  let decryptedMessage = ""; // Initialize variable to store the decrypted message

  // Track key indices for column arrangement
  let keyIndex = 0;

  // Track decrypted message indices
  let messageIndex = 0;

  // Calculate the length of the ciphertext
  const messageLength = cipherText.length;

  // Convert the ciphertext into an array
  const messageArray = Array.from(cipherText);

  // Calculate the number of columns in the matrix
  const columns = key.length;

  // Calculate the maximum number of rows in the matrix
  const rows = Math.ceil(messageLength / columns);

  // Convert the key into a sorted list for alphabetical access
  const sortedKey = Array.from(key).sort();

  // Create an empty matrix to store the deciphered message
  const decryptedMatrix = [];
  for (let i = 0; i < rows; i++) {
    decryptedMatrix.push(Array(columns).fill(null));
  }

  // Arrange the matrix column-wise according to permutation order
  // by adding into a new matrix
  for (let i = 0; i < columns; i++) {
    const currentKeyIndex = key.indexOf(sortedKey[keyIndex]);

    for (let j = 0; j < rows; j++) {
      decryptedMatrix[j][currentKeyIndex] = messageArray[messageIndex];
      messageIndex++;
    }
    keyIndex++;
  }

  // Convert the decrypted message matrix into a string
  try {
    decryptedMessage = decryptedMatrix.flat().join("");
  } catch (err) {
    throw new Error("This program cannot handle repeating words.");
  }

  return decryptedMessage;
}


// Exporting the functions
export { transpositionEncrypt, transpositionDecrypt };
