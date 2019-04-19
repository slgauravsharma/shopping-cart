import React from "react";
export const ContentEditableMark = props => (
    <span contentEditable={false} suppressContentEditableWarning="true" style={{
        display: 'inline-block',
        background: '#e5e5e5',
        cursor: 'pointer',
    }} {...props.attributes} >{props.children}</span>
);