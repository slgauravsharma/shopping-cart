import React, { Component } from "react";
import { Badge, Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.scss";

class Header extends Component {
  addToCartClick = () => {
    if (window.location.pathname !== "/cart") this.props.history.push("./cart");
  };

  onHeaderTitleClick = () => {
    if (window.location.pathname !== "/") this.props.history.push("./");
  };

  render() {
    return (
      <div className="header">
        <div className="title" onClick={this.onHeaderTitleClick}>
          Hallwaze V2.0
        </div>
        {/* <Badge count={this.props.carts.length} className="cart-badge">
          <Button
            type="primary"
            shape="circle"
            icon="shopping-cart"
            onClick={this.addToCartClick}
          />
        </Badge> */}
      </div>
    );
  }
}

const mapStateToProps = ({ carts }) => {
  return { carts };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
