import React, { Component } from "react";
import { withRouter} from 'react-router-dom'
import { connect } from "react-redux";
import { Card, Button } from 'antd';
import Header from "../../containers/header";
import InputNumber from "../../containers/inputNumber"
import './index.scss'
import { updateCartPriceAction, removeCartAction } from '../../actions/CartAction'
import { updateProductListAction } from '../../actions/ProductAction'


const Description = ({product, onInputQuantityChange, onPriceSave, onRemoveCartProduct, quantity}) => {
    return (
        <div>
           <span>Price: ${product.price} ₹</span> 
           <div className="description" >
               <InputNumber  className="price-input"
                value={quantity} onChange={onInputQuantityChange}
                placeholder="Enter quantity"/>
               <Button onClick={onPriceSave}>Save</Button>
               <Button onClick={onRemoveCartProduct}>Remove</Button>
           </div>
        </div>
    )
}

const { Meta } = Card;
class Cart extends Component {

    constructor(props) {
       super()
       this.state = {
          carts: props.carts
       }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.carts.length !== prevState.carts.length) {
            return {
                carts: nextProps.carts 
            }
        } else {
          return null
        }
    }

    onInputQuantityChange = (quantity, product) => {
     const carts = this.state.carts.map(cartProduct => {
            if (cartProduct.id === product.id) {
                return{...product, quantity}
            } else {
                return cartProduct
            }
        })
        this.setState({
            carts
        })
    }

    onPriceSave = product => {
      this.props.updateCartPriceAction(product)  
    }

    onRemoveCartProduct = product => {
       const updatedProduct = {
           ...product,
           isCart: false,
           quantity: ''
       }
       this.props.removeCartAction(updatedProduct)  
       this.props.updateProductListAction(updatedProduct)
    }

    render() {
    const { carts } = this.state
    return (
        <div className="cart">
            <Header />
            {carts.map(product => {
                return (
                 <div className="cart-bg" key={product.id}>
                <Card className="card">
                <Meta
                    avatar={<img alt="" src={product.imageUrl} className="img" />}
                    title={product.name}
                    description={<Description quantity={product.quantity}
                    product={product}
                    onInputQuantityChange={(value) => this.onInputQuantityChange(value, product)}
                    onPriceSave={() => this.onPriceSave(product)}
                    onRemoveCartProduct={() => this.onRemoveCartProduct(product)}
                    />}
                />
            </Card>  
            </div>   
                )
            })}
            {!carts.length && (
                <Card className="empty-cart">
                <Meta
                    title="Empty carts..."
                />
            </Card> 
            ) }
        </div>
    )
  }
}

const mapStateToProps = ({ products, carts }) => {
    return { products, carts };
  };
  
  const mapDispatchToProps = dispatch => {
    return { 
        updateCartPriceAction:  data => dispatch(updateCartPriceAction(data)), 
        removeCartAction: data => dispatch(removeCartAction(data)),
        updateProductListAction: data => dispatch(updateProductListAction(data))
     };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Cart));