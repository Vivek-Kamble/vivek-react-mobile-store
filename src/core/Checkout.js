import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link, Redirect } from "react-router-dom";
import { getPaymentData } from "./helper/checkoutHelper";
import { API } from "../backend";
import "./checkout.css";
import { createOrder } from "./helper/orderHelper";
import OrderSucess from "./OrderSucess";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

//main checkout func component
const Checkout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
  setLoading = (f) => f,
  loading = undefined,
}) => {
  const [data, setData] = useState({
    success: false,
    error: false,
    didRedirect: false,
    address: "",
  });
  const [orderDetails, setOrderDetails] = useState();
  const { success, error, didRedirect } = data;

  const getFinalAmount = () => {
    let finalPrice = 0;
    products.map((prod) => {
      finalPrice = finalPrice + prod.totalPrice;
    });
    setAmount(finalPrice);
  };
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    getFinalAmount();
  }, [products]);

  async function displayRazorpay() {
    // setData({ ...data, loading: true });
    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      alert("Payment sdk failed to load, check ur network");
      return;
    }

    const paymentData = await getPaymentData(amount * 100, userId, token);

    // console.log(paymentData);
    const options = {
      key: "rzp_test_3PYkwvoil834qD",
      amount: paymentData.amount,
      currency: paymentData.currency,
      order_id: paymentData.id,
      name: "Mobile Store",
      description: "Test Transaction",
      // image: "https://example.com/your_logo",
      handler: async function (response) {
        setData({ ...data, success: true });
        setReload(!reload);
        // setReload(!reload);
        // console.log(products);
        // console.log(response);
        const orderData = {
          products: products,
          transaction_id: response.razorpay_payment_id,
          amount: paymentData.amount,
        };
        // console.log(orderData);
        const orderResponse = await createOrder(userId, token, orderData);
        // .then((res) => res.json)
        // .catch((err) => console.log(err));
        // console.log(orderResponse);
        cartEmpty();
        setLoading(false);
        setOrderDetails(orderResponse);

        // successRedirect(orderResponse);
      },
      prefill: {
        name: "Vivek Kamble",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const successRedirect = (order) => {
    // console.log(order);
    // console.log(success);
    if (order) {
      console.log(order);
      return <Redirect to={`user/order/success/${order._id}`} />;
    }
  };

  const user = isAuthenticated() && isAuthenticated().user;
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const showPaymentButton = () => {
    return isAuthenticated() ? (
      <button
        className="btn btn-success rounded"
        onClick={() => {
          displayRazorpay();

          // getPaymentData(amount);
          // payumoney(getFinalAmount(), user, products[0]);
        }}
      >
        Proceed for payment
      </button>
    ) : (
      <span>
        <p className="text-danger signin">Please Sign in to proceed order</p>
        <Link to="/signin">
          <button className="btn mt-4 rounded btn-primary">Sign In</button>
        </Link>
      </span>
    );
  };

  return (
    <div className="check-container">
      <h5 className="finalamount">
        Final Amount :<span className="text-success">₹ {amount}</span>
      </h5>
      {showPaymentButton()}
      {successRedirect(orderDetails || null)}
    </div>
  );
};

export default Checkout;
