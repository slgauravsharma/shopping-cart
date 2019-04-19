import EditTable from 'slate-edit-table';

const MarkHotkey = (options) => {
    const { type, key } = options

    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, editor, next) {
            console.log('event, ', event)
            // If it doesn't match our `key`, let other plugins handle it.


            var key = event.keyCode || event.charCode;
            console.log('key ', key)
            if (key == 8 || key == 46) {
                console.log('called.....')
                return next()
                // event.preventDefault()
                // editor.deleteWordBackward()
            }

            if (!event.ctrlKey || event.key != key) return next()


            // Prevent the default characters from being inserted.
            event.preventDefault()

            // Toggle the mark `type`.
            editor.toggleMark(type)
        },
    }
}

const tablePlugin = EditTable(/* options */);

const plugins = [MarkHotkey({ key: 'b', type: 'bold' }),
MarkHotkey({ key: '`', type: 'code' }),
MarkHotkey({ key: 'i', type: 'italic' }),
MarkHotkey({ key: '~', type: 'strikethrough' }),
MarkHotkey({ key: 'u', type: 'underlined' }),
    // MarkHotkey({ key: 'backspace', type: 'backspace' }),
    tablePlugin]

export default plugins