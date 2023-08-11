function railFenceEncrypt(text, rails) {
  if (rails < 2) {
    throw new Error("Number of rails must be at least 2.");
  }

  const textLength = text.length;
  const railMatrix = new Array(rails)
    .fill("")
    .map(() => new Array(textLength).fill(""));
  let currentRail = 0;
  let direction = 1;

  for (let i = 0; i < textLength; i++) {
    railMatrix[currentRail][i] = text[i];

    if (currentRail === 0) {
      direction = 1;
    } else if (currentRail === rails - 1) {
      direction = -1;
    }

    currentRail += direction;
  }

  return railMatrix.flat().join("");
}

function railFenceDecrypt(text, rails) {
  if (rails < 2) {
    throw new Error("Number of rails must be at least 2.");
  }

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

  return decryptedText;
}

// Exporting the functions
export { railFenceEncrypt, railFenceDecrypt };
