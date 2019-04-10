const MarkHotkey = (options) => {
    const { type, key } = options

    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key != key) return next()

            // Prevent the default characters from being inserted.
            event.preventDefault()

            // Toggle the mark `type`.
            editor.toggleMark(type)
        },
    }
}

const plugins = [MarkHotkey({ key: 'b', type: 'bold' }),
MarkHotkey({ key: '`', type: 'code' }),
MarkHotkey({ key: 'i', type: 'italic' }),
MarkHotkey({ key: '~', type: 'strikethrough' }),
MarkHotkey({ key: 'u', type: 'underline' }),]

export default plugins