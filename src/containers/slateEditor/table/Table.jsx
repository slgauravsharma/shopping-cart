import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid black;
  margin-bottom: 1rem;
  p {
    margin-bottom: 0;
  }
`;

const SelectionBox = styled.div`
  background: rgba(0, 162, 255, 0.4);
  position: absolute;
  z-index: 9000;
  display: block;
  border: 1px solid #aaf81a;
  width: ${props => (props.width ? props.width : null)};
  height: ${props => (props.height ? props.height : null)};
  left: ${props => (props.left ? props.left : null)};
  top: ${props => (props.top ? props.top : null)};
  span {
    background-color: rgba(239, 28, 190, 0.6);
    border: 1px solid #b20e8c;
    width: 100%;
    height: 100%;
    float: left;
  }
`;

class Table extends Component {
  state = {
    isDragging: false,
    startPoint: null,
    left: null,
    top: null,
    width: null,
    height: null
  };

  tableRef = React.createRef();

  rangeMouseDown = e => {
    this.setState({
      isDragging: true,
      startPoint: {
        x: e.pageX,
        y: e.pageY
      }
    });
  };

  rangeMouseUp = () => {
    this.setState({
      isDragging: false,
      startPoint: null
    });
  };

  rangeMouseMove = e => {
    const { isDragging, startPoint } = this.state;
    if (isDragging) {
      if (startPoint) {
        const cellReference = this.tableRef;
        const width = Math.abs(startPoint.x - e.pageX);
        const height = Math.abs(startPoint.y - e.pageY);
        const left =
          Math.min(startPoint.x, e.pageX) - cellReference.current.offsetLeft;
        const top =
          Math.min(startPoint.y, e.pageY) - cellReference.current.offsetTop;
        this.setState({
          width,
          height,
          left,
          top
        });
      }
    }
  };

  render() {
    const { attributes, children } = this.props;
    const { width, height, left, top, isDragging } = this.state;

    return (
      <div
        ref={this.tableRef}
        onMouseDown={e => {
          // console.log('entered mouse down', e.button);
          this.rangeMouseDown(e);
        }}
        onMouseUp={e => {
          // console.log('entered mouse up');
          this.rangeMouseUp(e);
        }}
        onMouseMove={e => {
          // console.log('entered mouse move');
          this.rangeMouseMove(e);
        }}
      >
        <TableContainer>
          <tbody {...attributes}>{children}</tbody>
        </TableContainer>
        {isDragging ? (
          <SelectionBox width={width} height={height} top={top} left={left}>
            <span />
          </SelectionBox>
        ) : null}
      </div>
    );
  }
}

Table.propTypes = {
  children: PropTypes.node,
  editor: PropTypes.objectOf(PropTypes.object),
  attributes: PropTypes.objectOf(PropTypes.object)
};

Table.defaultProps = {
  children: null,
  editor: {},
  attributes: {}
};

export default Table;
