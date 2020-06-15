import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getPaymentData } from "./helper/checkoutHelper";
import { API } from "../backend";

// export const getPaymentData = async (data) => {
//   console.log(data);
//   return fetch(`${API}/razorpay`, {
//     method: "POST",
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     body: { data },
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

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
const Checkout = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: false,
    address: "",
  });

  const getFinalAmount = () => {
    products.map((prod) => {
      setAmount(prod.totalPrice);
    });
  };
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    getFinalAmount();
  }, [products]);

  async function displayRazorpay() {
    const res = await loadRazorpay();
    if (!res) {
      alert("Payment sdk failed to load, check ur network");
      return;
    }

    const body = {
      amount: `${amount}`,
      currency: "INR",
    };

    // const paymentData = await data.json();
    const paymentData = await fetch(`http://192.168.0.7:8000/api/razorpay`, {
      method: "POST",
      body: await JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    console.log("111111", paymentData);

    const options = {
      key: "rzp_test_3PYkwvoil834qD",
      amount: paymentData.amount,
      currency: paymentData.currency,
      order_id: paymentData.id,
      name: "Mobile Store",
      description: "Test Transaction",
      // image: "https://example.com/your_logo",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const user = isAuthenticated() && isAuthenticated().user;
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const showPaymentButton = () => {
    return isAuthenticated() ? (
      <button
        className="btn btn-success rounded"
        onClick={() => {
          displayRazorpay();
          // payumoney(getFinalAmount(), user, products[0]);
        }}
      >
        Proceed for payment
      </button>
    ) : (
      <span>
        <p className="text-danger">Please Sign in to proceed order</p>
        <Link to="/signin">
          <button className="btn mt-4 rounded btn-primary">Sign In</button>
        </Link>
      </span>
    );
  };

  return (
    <div>
      <h5>
        Final Amount :<span className="text-success">₹ {amount}</span>
      </h5>

      {showPaymentButton()}
    </div>
  );
};

export default Checkout;
