import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import { loadCart } from "./helper/cartHelper";
import CartUI from "./CartUI";
import Checkout from "./Checkout";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        {products.map((product, index) => (
          <CartUI
            key={index}
            product={product}
            addToCart={false}
            removeFromCart={true}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Base title="Cart">
        <div className="row">
          {products.length == 0 ? (
            <div className="alert alert-danger col-8 offset-2 text-center">
              Your cart is Empty
            </div>
          ) : (
            <React.Fragment>
              <div className="col-9">{loadAllProducts()}</div>
              <div className="col-3">
                <Checkout
                  products={products}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </Base>
    </div>
  );
}
