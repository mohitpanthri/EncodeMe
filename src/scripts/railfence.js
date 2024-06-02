// Function to perform railfence Cipher encryption
function railFenceEncrypt(text, rails) {
  text = text.toUpperCase().replace(/\s/g, "");
  let i = 0,
    j = 0,
    l,
    counter = 0;
  let flag = "down";

  l = text.length;
  let railMatrix = [];
  for (i = 0; i < rails; i++) {
    railMatrix[i] = [];
    for (j = 0; j < l; j++) railMatrix[i][j] = " ";
  }
  i = 0;
  j = 0;
  while (counter < l) {
    railMatrix[i][j] = text[counter];
    counter++;
    j++;

    if (i == rails - 1) flag = "up";
    if (i == 0) flag = "down";
    if (flag == "down") i++;
    if (flag == "up") i--;
  }
  table(railMatrix, rails, l);
  return railMatrix.flat().join("").replace(/ /g, "");
}

// Function to perform railfence Cipher decryption
function railFenceDecrypt(text, rails) {
  text = text.toUpperCase().replace(/\s/g, "");
  const textLength = text.length;
  const railMatrix = new Array(rails)
    .fill("")
    .map(() => new Array(textLength).fill(""));
  let currentRail = 0;
  let direction = 1;

  for (let i = 0; i < textLength; i++) {
    railMatrix[currentRail][i] = "X";

    if (currentRail === 0) {
      direction = 1;
    } else if (currentRail === rails - 1) {
      direction = -1;
    }

    currentRail += direction;
  }

  let index = 0;
  for (let rail = 0; rail < rails; rail++) {
    for (let col = 0; col < textLength; col++) {
      if (railMatrix[rail][col] === "X" && index < textLength) {
        railMatrix[rail][col] = text[index++];
      }
    }
  }

  let decryptedText = "";
  currentRail = 0;
  direction = 1;

  for (let i = 0; i < textLength; i++) {
    decryptedText += railMatrix[currentRail][i];

    if (currentRail === 0) {
      direction = 1;
    } else if (currentRail === rails - 1) {
      direction = -1;
    }

    currentRail += direction;
  }
  console.log(railMatrix);
  table(railMatrix, rails, textLength);
  return decryptedText;
}

// Exporting the functions
export { railFenceEncrypt, railFenceDecrypt };
