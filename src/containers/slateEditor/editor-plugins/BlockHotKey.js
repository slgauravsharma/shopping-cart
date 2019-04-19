export function BlockHotKey(options) {
  const { type, normalType, key } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, editor, next) {
      // Check that the key pressed matches our `key` option.
      if (!event.ctrlKey || event.key !== key) return next();

      // Prevent the default characters from being inserted.
      event.preventDefault();

      // Determine whether any of the currently selected blocks are of type `type`.
      const isType = editor.value.blocks.some(block => block.type === type);

      // Toggle the block type depending on `isType`.
      editor.setBlocks(isType ? normalType : type);
      return true;
    }
  };
}
