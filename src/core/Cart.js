import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import { loadCart } from "./helper/cartHelper";
import CartUI from "./CartUI";
import Checkout from "./Checkout";
import Loading from "../core/Loading";
export default function Cart() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadingMessage = () => {
    return loading && <Loading />;
    // <div className="alert alert-info">Loading...</div>;
  };

  const loadAllProducts = (products) => {
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
            setLoading={setLoading}
            loading={loading}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Base title="Cart">
        {loadingMessage()}
        <div className="row">
          {products.length <= 0 ? (
            <div className="alert alert-danger col-8 offset-2 text-center">
              Your cart is Empty
            </div>
          ) : (
            <React.Fragment>
              <div className="col-9">{loadAllProducts(products)}</div>
              <div className="col-3">
                <Checkout
                  products={products}
                  setReload={setReload}
                  reload={reload}
                  setLoading={setLoading}
                  loading={loading}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </Base>
    </div>
  );
}
