export function InsertWordHotKey(options) {
  const { char, word } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, editor, next) {
      // Check that the key pressed matches our `key` option.
      if (event.key !== char) return next();

      // Prevent the default characters from being inserted.
      event.preventDefault();

      // Change the value by inserting "and" at the cursor's position.
      editor.insertText(word);
    }
  };
}
