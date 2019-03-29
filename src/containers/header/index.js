import React, { Component } from "react";
import { Badge , Button } from 'antd'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import './index.scss';

class Header extends Component {

  addToCartClick = () => {
   if (this.props.location.pathname !== '/cart')
     this.props.history.push('./cart') 
  }

  render() {
      return (
        <div className="header">
        <div className="bg">
            <Badge count={this.props.carts.length} className="cart-badge">
              <Button type="primary" shape="circle" icon="shopping-cart" onClick={this.addToCartClick} />
            </Badge>
        </div>
      </div>
      )
  }
}

const mapStateToProps = ({ carts }) => {
  return { carts };
};

const mapDispatchToProps = () => {
  return { 
   };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header));