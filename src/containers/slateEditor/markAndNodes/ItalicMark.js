import React from "react";
export const ItalicMark = props => (
    <em {...props.attributes}>{props.children}</em>
);