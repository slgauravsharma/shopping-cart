export function MarkHotKey(options) {
  const { type, key } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, editor, next) {

      var eventKey = event.keyCode || event.charCode;

      // remove charater when backspace press
      if (eventKey === key && eventKey == 8 || eventKey == 46) {
        event.preventDefault()
        editor.deleteCharBackward()
      }
      // Check that the key pressed matches our `key` option.
      if (!event.ctrlKey || event.key !== key) return next();
      // Prevent the default characters from being inserted.
      event.preventDefault();
      // Toggle the mark `type`.
      editor.toggleMark(type);
    }
  };
}
