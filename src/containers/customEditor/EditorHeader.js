import React from 'react';
const EditorHeader = ({
    isBold, onClickMark
}) => {
    return (
        <div className="editor-header">
            <div className="item" onClick={e => onClickMark(e, 'bold')}>{isBold ? <strong>B</strong> : <span>B</span>}</div>
        </div>
    )
}

export default EditorHeader