import React, { useState, useEffect } from "react";

import "./cardstyle.css";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart } from "./helper/cartHelper";
const Card = ({ product, addToCart = true, removeFromCart = false }) => {
  const [redirect, setRedirect] = useState(false);

  const cartName = product ? product.name : "No name";
  const cartDescription = product ? product.description : "Default";
  const cartPrice = product ? product.price : "default";

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
        <button className="col-sm-8 ml-2 btn btn-sm btn-outline-danger rounded">
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="ourcard">
      {getARedirect(redirect)}
      <div className="image">
        <ImageHelper product={product} />
      </div>
      <div className="right">
        <p className="font-weight-bold name">{cartName}</p>
        <p className="font-weight-normal text-success">{cartDescription}</p>
        <p className="text-muted">₹ {cartPrice}</p>
        <div className="row mt-2">
          {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
