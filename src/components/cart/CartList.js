import React from "react";
import { Card, Button } from "antd";
import InputNumber from "../../containers/inputNumber";

const { Meta } = Card;

const CartList = ({
  carts,
  onInputQuantityChange,
  onPriceSave,
  onRemoveCartProduct
}) => (
  <>
    {carts.map(product => (
      <div className="card-padding" key={product.id}>
        <Card className="card">
          <Meta
            avatar={<img alt="" src={product.imageUrl} className="img" />}
            title={product.name}
            description={
              <div>
                <span>Price: ${product.price} ₹</span>
                <div className="card-item">
                  <InputNumber
                    className="item"
                    min="1"
                    value={product.quantity}
                    onChange={value => onInputQuantityChange(value, product)}
                    placeholder="quantity"
                  />
                  <Button className="item" onClick={() => onPriceSave(product)}>
                    Save
                  </Button>
                  <Button
                    className="item"
                    onClick={() => onRemoveCartProduct(product)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            }
          />
        </Card>
      </div>
    ))}
  </>
);

export default CartList;
