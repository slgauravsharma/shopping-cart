import React from "react";
export const GenericElement = ({ elementType, children, ...props }) => {
    return React.createElement(`${elementType}`, props, children)
}