import React from "react";
export const BoldMark = props => (
  <span {...props.attributes} style={{ fontWeight: "bold" }}>
    {props.children}
  </span>
);
