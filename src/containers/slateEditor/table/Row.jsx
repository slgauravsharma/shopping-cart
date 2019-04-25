import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const RowContainer = styled.tr`
  border: none;
  width: 100%;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
`;

const Row = props => {
  const { attributes, children } = props;
  return <RowContainer {...attributes}>{children}</RowContainer>;
};

Row.propTypes = {
  children: PropTypes.node,
  attributes: PropTypes.objectOf(PropTypes.object)
};

Row.defaultProps = {
  children: null,
  attributes: {}
};

export default Row;
