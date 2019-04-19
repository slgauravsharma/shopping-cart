export function BlockColorHotKey(options) {
  const { key, color } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, editor, next) {
      // Check that the key pressed matches our `key` option.
      if (!event.ctrlKey || event.key !== key) return next();

      // Prevent the default characters from being inserted.
      event.preventDefault();

      // Determine whether any of the currently selected blocks are code blocks.
      const isColor = editor.value.blocks.some(
        block => block.data.get("color") === color
      );

      // Change the value by setting or unsetting it's data.color property.
      // NOTE: It is up to the user to render the node using that property.
      editor.setBlocks({
        data: {
          color: isColor ? "" : color
        }
      });
    }
  };
}
