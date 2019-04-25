import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CellConatainer = styled.td`
  width: 300px;
  border: 1px solid black;
  border-top: none;
  border-bottom: none;
  border-right: none;
  padding: 0.5em;
`;

const Cell = props => {
  let textAlign;
  const { attributes, children, node } = props;
  textAlign = node.get("data").get("textAlign");
  textAlign =
    ["left", "right", "center"].indexOf(textAlign) === -1 ? "left" : textAlign;
  return (
    <CellConatainer style={{ textAlign }} {...attributes}>
      {children}
    </CellConatainer>
  );
};

Cell.propTypes = {
  children: PropTypes.node,
  node: PropTypes.objectOf(PropTypes.object),
  attributes: PropTypes.objectOf(PropTypes.object)
};

Cell.defaultProps = {
  children: null,
  attributes: {},
  node: {}
};

export default Cell;
