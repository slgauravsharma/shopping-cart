import React, { Component } from 'react'
import { Icon as AIcon } from 'antd'

class TableSettings extends Component {

    render() {
        const { onChange, editor } = this.props
        return (
            <div style={{ height: '30px', width: '100%', marginBottom: '10px', borderBottom: '2px solid #eee' }}>
                <AIcon type="delete"
                    onClick={() => onChange(editor.removeTable())}
                    style={{ marginLeft: '10px', cursor: 'pointer' }} />
                <button style={{ marginLeft: '10px' }} onClick={() => onChange(editor.insertColumn())}>Insert Column</button>
                <button style={{ marginLeft: '10px' }} onClick={() => onChange(editor.insertRow())}>Insert Row</button>
                <button style={{ marginLeft: '10px' }} onClick={() => onChange(editor.removeColumn())}>Remove Column</button>
                <button style={{ marginLeft: '10px' }} onClick={() => onChange(editor.removeRow())}>Remove Row</button>
                <button style={{ marginLeft: '10px' }} onClick={() => onChange(editor.toggleTableHeaders())}>Toggle Headers</button>
            </div>
        )
    }
}

export default TableSettings