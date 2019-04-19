import React from "react";
export const CodeNode = props => (
  <pre {...props.attributes} style={{ color: props.node.data.get("color") }}>
    <code>{props.children}</code>
  </pre>
);
