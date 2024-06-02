// Function to generate the key square
function generateKeySquare(keyword) {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const uniqueChars = [];
  const keySquare = [];

  // Remove duplicate characters from the keyword and handle "I" and "J" as the same letter
  for (const char of keyword.toUpperCase()) {
    if (!uniqueChars.includes(char) && char !== "J") {
      uniqueChars.push(char);
    }
  }

  // Build the key square
  for (let i = 0; i < uniqueChars.length; i++) {
    keySquare.push(uniqueChars[i]);
  }

  for (let i = 0; i < alphabet.length; i++) {
    if (!uniqueChars.includes(alphabet[i])) {
      keySquare.push(alphabet[i]);
    }
  }

  return keySquare;
}

// Function to handle repeated letters by inserting a filler letter
function modifyText(plaintext) {
  let modifiedText = "";
  for (let i = 0; i < plaintext.length; i += 2) {
    let pair = plaintext.slice(i, i + 2);
    if (pair.length === 2 && pair[0] === pair[1]) {
      modifiedText += pair[0] + "X" + pair[1];
    } else {
      modifiedText += pair;
    }
  }

  if (modifiedText.length % 2 !== 0) {
    modifiedText += "X";
  }

  return modifiedText;
}

// Function to perform Playfair encryption
function playfairEncrypt(text, keyword) {
  keyword = keyword.toUpperCase().replace(/\s/g, "");
  const keySquare = generateKeySquare(keyword);
  let encryptedText = "";
  let pos1, pos2, row1, row2, col1, col2;

  // Replacing any J in the text with I
  let replaceJ = text.toUpperCase().replace(/\s/g, "").replace(/J/g, "I");
  text = modifyText(replaceJ);

  for (let i = 0; i < text.length; i += 2) {
    pos1 = keySquare.indexOf(text[i]);
    pos2 = keySquare.indexOf(text[i + 1]);
    row1 = Math.floor(pos1 / 5);
    col1 = pos1 % 5;
    row2 = Math.floor(pos2 / 5);
    col2 = pos2 % 5;

    // Same letter in the same row
    if (row1 === row2) {
      encryptedText += keySquare[row1 * 5 + ((col1 + 1) % 5)];
      encryptedText += keySquare[row1 * 5 + ((col2 + 1) % 5)];
    }
    // Same letter in the same column
    else if (col1 === col2) {
      encryptedText += keySquare[((row1 + 1) % 5) * 5 + col1];
      encryptedText += keySquare[((row2 + 1) % 5) * 5 + col1];
    }
    // Rectangle case
    else {
      encryptedText += keySquare[row1 * 5 + col2];
      encryptedText += keySquare[row2 * 5 + col1];
    }
  }

  return encryptedText;
}

// Function to perform Playfair decryption
function playfairDecrypt(text, keyword) {
  keyword = keyword.toUpperCase().replace(/\s/g, "");
  const keySquare = generateKeySquare(keyword);
  let decryptedText = "";
  let pos1, pos2, row1, row2, col1, col2;

  // Replacing any J in the text with I
  text = text.toUpperCase().replace(/\s/g, "").replace(/J/g, "I");

  for (let i = 0; i < text.length; i += 2) {
    pos1 = keySquare.indexOf(text[i]);
    pos2 = keySquare.indexOf(text[i + 1]);
    row1 = Math.floor(pos1 / 5);
    col1 = pos1 % 5;
    row2 = Math.floor(pos2 / 5);
    col2 = pos2 % 5;

    // Same letter in the same row
    if (row1 === row2) {
      decryptedText += keySquare[row1 * 5 + ((col1 + 4) % 5)];
      decryptedText += keySquare[row1 * 5 + ((col2 + 4) % 5)];
    }
    // Same letter in the same column
    else if (col1 === col2) {
      decryptedText += keySquare[((row1 + 4) % 5) * 5 + col1];
      decryptedText += keySquare[((row2 + 4) % 5) * 5 + col1];
    }
    // Rectangle case
    else {
      decryptedText += keySquare[row1 * 5 + col2];
      decryptedText += keySquare[row2 * 5 + col1];
    }
  }

  return decryptedText;
}

// Exporting the functions
export { playfairEncrypt, playfairDecrypt };
