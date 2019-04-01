import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";
import "./index.scss";
import productList from "../../config/productList.json";
import {
  listProductAction,
  updateProductListAction
} from "../../actions/productActions";
import { addCartAction } from "../../actions/cartActions";

const { Meta } = Card;
class Products extends Component {
  componentDidMount() {
    if (!this.props.products.length) {
      this.props.listProductAction(productList.data);
    }
  }

  addToCartClick = product => {
    const updatedProduct = {
      ...product,
      isCart: true,
      quantity: "1"
    };
    this.props.addCartAction(updatedProduct);
    this.props.updateProductListAction(updatedProduct);
    this.props.history.push("./cart");
  };

  render() {
    const { products } = this.props;
    return (
      <div className="products">
        <div className="grid">
          {products.map(product => {
            return (
              <div key={product.id} className="grid-item">
                <Card
                  hoverable
                  className="card"
                  cover={
                    <img alt="example" src={product.imageUrl} className="img" />
                  }
                >
                  <Meta
                    title={product.name}
                    description={
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>Price: ${product.price} ₹</div>
                        <Button
                          disabled={product.isCart}
                          onClick={() => this.addToCartClick(product)}
                        >
                          Add to cart
                        </Button>
                      </div>
                    }
                  />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return { products };
};

const mapDispatchToProps = dispatch => {
  return {
    listProductAction: data => dispatch(listProductAction(data)),
    addCartAction: data => dispatch(addCartAction(data)),
    updateProductListAction: data => dispatch(updateProductListAction(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
