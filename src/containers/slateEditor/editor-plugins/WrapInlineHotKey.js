import { extendToWord } from "./ExtendToWord";

export function WrapInlineHotKey(options) {
  const { type, key } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, change, editor) {
      // Check that the key pressed matches our `key` option.
      if (!event.ctrlKey || event.key !== key) return;

      // Prevent the default characters from being inserted.
      event.preventDefault();

      if (editor.value.selection.isExpanded) {
        // Wrap the selected text with an inline element
        change.wrapInline(type).collapseToEnd();
      } else {
        // Expand the current selection and then wrap that.
        change
          .call(extendToWord)
          .wrapInline(type)
          .collapseToEnd();
        // const currentTextNode = editor.value.anchorText
        // const anchorOffset = editor.value.selection.anchorOffset
        // let endOfWord = currentTextNode.text.indexOf(' ', anchorOffset)
        // let startOfWord = currentTextNode.text.lastIndexOf(' ', anchorOffset)
        // if (endOfWord === -1) {
        //   endOfWord = currentTextNode.text.length
        // } else {
        //   // endOfWord-- // We don't want to select the actual space character too
        // }
        // if (startOfWord === -1) {
        //   startOfWord = 0
        // } else {
        //   startOfWord++ // We don't want to select the actual space character too
        // }

        // console.log(startOfWord, endOfWord)
        // change.moveOffsetsTo(startOfWord, endOfWord).wrapInline(type).deselect();
      }
    }
  };
}
