import React, { useState, useEffect } from "react";
import "./cartui.css";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const CartUI = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cartName = product ? product.name : "No name";
  const cartDescription = product ? product.description : "Default";
  const cartPrice = product ? product.price : "default";
  product.quantity = quantity;
  product.totalPrice = cartPrice * quantity;

  const addingToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addingToCart}
          className="col-sm-8 btn rounded btn-sm btn-outline-primary"
        >
          Add to cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="remove col-sm-8 ml-2 btn btn-sm btn-outline-danger rounded"
        >
          Remove from cart
        </button>
      )
    );
  };

  //   const deliveryDate
  var newDate = "Sat Jun 13 2020";
  return (
    <div className="ourcard1">
      {getARedirect(redirect)}
      <div className="image1 col-1">
        <ImageHelper product={product} />
      </div>
      <div className="right1">
        <p className="font-weight-bold name1">{cartName}</p>
        <p className="font-weight-normal text-success desc1">
          {cartDescription}
        </p>

        <div className="row mt-2">
          {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
      <div className="delivery">
        Expected delivery
        <p className="text text-success">Sat Jun 13 2020</p>
      </div>
      <div className="price">
        <span className="">Price</span>
        <p className="text-success">₹ {cartPrice * quantity}</p>
      </div>
      <div className="quantity row">
        <i
          className="fa fa-minus pl-3 iconm"
          aria-hidden="true"
          onClick={() => {
            if (quantity > 1) {
              setReload(!reload);
              setQuantity(quantity - 1);
            }
          }}
        ></i>
        <span className="text-center pl-2">{quantity}</span>
        <i
          className="fa fa-plus pl-2 iconp"
          aria-hidden="true"
          onClick={() => {
            setReload(!reload);
            setQuantity(quantity + 1);
          }}
        ></i>
      </div>
    </div>
  );
};

export default CartUI;
