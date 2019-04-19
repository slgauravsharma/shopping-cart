import React, { Component } from 'react'
import { Icon as AIcon } from 'antd'
import './RichTextExample.scss'

class TableSettings extends Component {

    onRemoveTable = () => {
        console.log('type- ', this.props.editor.controller.value.focusBlock.type)
        try {
            if (this.props.editor.controller.value.focusBlock.type === 'table-cell') {
                console.log('called--')
                do {
                    this.props.editor.delete()
                }
                while (this.props.editor.controller.value.focusBlock && (this.props.editor.controller.value.focusBlock.type === 'table-cell'
                    || this.props.editor.controller.value.focusBlock.type === 'table-row'));
                this.forceUpdate()
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