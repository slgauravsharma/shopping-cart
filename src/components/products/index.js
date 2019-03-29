import React, { Component } from "react";
import { withRouter} from 'react-router-dom'
import { connect } from "react-redux";
import { Card, Row, Col, Button } from 'antd';
import Header from '../../containers/header'
import './index.scss'
import productList from '../../config/productList.json'
import { listProductAction, updateProductListAction } from "../../actions/ProductAction";
import { addCartAction } from '../../actions/CartAction'

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
      quantity: ''
    }
    this.props.addCartAction(updatedProduct);
    this.props.updateProductListAction(updatedProduct)
    this.props.history.push('./cart')
  }

    render() {
    const { products } = this.props
    return (
        <div className="products">
          <Header />
          <div className="product-bg">
          <Row gutter={16}>
            {products.map(product => {
            return (
              <Col span={6} key={product.id}>
              <Card
                hoverable
                className="product-card"
                cover={<img alt="example" src={product.imageUrl} className="product-img"/>}
              >
                <Meta
                  title={product.name}
                  description={`Price: ${product.price} ₹`}
                />
                <Button disabled={product.isCart}
                 className="add-to-cart-btn" onClick={() => this.addToCartClick(product)}>Add to cart</Button>
              </Card>
          </Col>
            )
          })}       
            </Row>
          </div>
        </div>
    )
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
)(withRouter(Products));