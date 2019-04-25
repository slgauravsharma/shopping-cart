import React, { Component } from 'react'
import { Icon as AIcon } from 'antd'

class TableSettings extends Component {

    onRemoveTable = () => {
        console.log('onRemoveTable editor- ', this.props.editor)
        try {
            const { editor, onChange } = this.props
            if (editor.controller.value.focusBlock.type === 'table-cell') {
                // onChange(
                //     editor.removeTable()
                // );
                // const cursorBlock = editor.value.document.getDescendant('_cursor_')
                // return editor
                //     .moveToRangeOfNode(cursorBlock)
                //     .removeTable()
                //     .value;
                // this.props.editor.delete()

                // console.log('called--')
                // do {
                //     this.props.editor.delete()
                // }
                // while (this.props.editor.controller.value.focusBlock && (this.props.editor.controller.value.focusBlock.type === 'table-cell'
                //     || this.props.editor.controller.value.focusBlock.type === 'table-row'));
                // this.forceUpdate()
            }
        } catch (e) {
            console.log('error- remove table ', e)
        }

    }

    render() {
        return (
            <div style={{ height: '30px', width: '100%', marginBottom: '10px', borderBottom: '2px solid #eee' }}>
                <AIcon type="delete"
                    onClick={this.onRemoveTable}
                    style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </div>
        )
    }
}

export default TableSettings