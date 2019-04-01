import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, message } from "antd";
import "./index.scss";
import {
  updateCartPriceAction,
  removeCartAction
} from "../../actions/cartActions";
import { updateProductListAction } from "../../actions/productActions";
import CartList from "./CartList";

const { Meta } = Card;
class Cart extends Component {
  constructor(props) {
    super();
    this.state = {
      carts: props.carts,
      quantity: "1"
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.carts.length !== prevState.carts.length) {
      return {
        carts: nextProps.carts
      };
    } else {
      return null;
    }
  }

  onInputQuantityChange = (quantity, product) => {
    const carts = this.state.carts.map(cartProduct => {
      if (cartProduct.id === product.id) {
        return { ...product, quantity };
      } else {
        return cartProduct;
      }
    });
    this.setState({
      carts
    });
  };

  onPriceSave = product => {
    this.props.updateCartPriceAction(product);
    message.success("Cart price is updated successfully.", 1);
  };

  onRemoveCartProduct = product => {
    const updatedProduct = {
      ...product,
      isCart: false,
      quantity: ""
    };
    this.props.removeCartAction(updatedProduct);
    this.props.updateProductListAction(updatedProduct);
  };

  render() {
    const { carts, quantity } = this.state;
    const calPricebyQuantity = product => product.price * product.quantity;
    const calSubTotalPrice = () => {
      const { carts } = this.props;
      if (carts.length)
        if (carts.length === 1) {
          return calPricebyQuantity(carts[0]);
        }
      return (
        carts.length &&
        carts.reduce((a, c) => {
          const calAccValue = typeof a === "number" ? a : calPricebyQuantity(a);
          return calAccValue + calPricebyQuantity(c);
        })
      );
    };
    return (
      <div className="cart">
        {!carts.length ? (
          <Card className="empty-cart">
            <Meta title="Your Shopping Cart is empty." />
          </Card>
        ) : (
          <>
            <div className="cart-list">
              <CartList
                carts={carts}
                quantity={quantity}
                onInputQuantityChange={this.onInputQuantityChange}
                onPriceSave={this.onPriceSave}
                onRemoveCartProduct={this.onRemoveCartProduct}
              />
            </div>
            <div className="cart-subtotalprice">
              <Card>
                <span>
                  Subtotal ({carts.length} item): {calSubTotalPrice()} ₹
                </span>
              </Card>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ products, carts }) => {
  return { products, carts };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCartPriceAction: data => dispatch(updateCartPriceAction(data)),
    removeCartAction: data => dispatch(removeCartAction(data)),
    updateProductListAction: data => dispatch(updateProductListAction(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
