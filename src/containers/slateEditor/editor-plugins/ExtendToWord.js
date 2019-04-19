export function extendToWord(change, editor) {
  // Expand the current selection to the nearest space
  const currentTextNode = change.value.anchorText;
  const startOffset = change.value.selection.startOffset;
  const endOffset = change.value.selection.endOffset;
  const endSearchText = currentTextNode.text.slice(endOffset);
  const startSearchText = currentTextNode.text
    .slice(0, startOffset)
    .split("")
    .reverse()
    .join("");
  console.log(startSearchText, endSearchText);
  let endOfWord = endSearchText.search(/\s/);
  let startOfWord = startSearchText.search(/\s/);
  if (endOfWord === -1) {
    endOfWord = endSearchText.length;
  } else {
    // endOfWord-- // We don't want to select the actual space character too
  }
  if (startOfWord === -1) {
    startOfWord = startSearchText.length;
  } else {
    //startOfWord; // We don't want to select the actual space character too
  }

  console.log(startOfWord, endOfWord);
  change.moveOffsetsTo(startOffset - startOfWord, endOffset + endOfWord);
}
