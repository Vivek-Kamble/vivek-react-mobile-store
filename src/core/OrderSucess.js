import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getprocessedOrderDetails } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

export default function OrderSucess({ match }) {
  const orderId = match.params.orderId;
  const { user, token } = isAuthenticated();
  const [orderDetails, setOrderDetails] = useState({});

  async function getorderDetails() {
    const order = await getprocessedOrderDetails(user._id, token, orderId);
    setOrderDetails(order);
  }
  useEffect(() => {
    getorderDetails();
  }, []);

  const showOrderDetails = () => {
    console.log(orderDetails);
    if (orderDetails) {
      return (
        <div className="col-8 offset-2 ">
          <h4
            //   style="text-align: center;font-size: 25px;"
            className="bg-primary text-white rounded text-center full-width"
          >
            <b>Invoice </b>
          </h4>
          <ul>
            <li>Transaction ID : {orderDetails.transaction_id}</li>
            <li>
              Name : <span>{user.name}</span>{" "}
            </li>
            <li>
              Email : <span>{user.email}</span>{" "}
            </li>
            <li>
              Total Amount : Rs{" "}
              <span id="final_invoice_price">{orderDetails.amount / 100}</span>
            </li>
          </ul>
          <h4
            //   style="text-align: center;font-size: 25px;"
            className="bg-primary text-white text-center rounded"
          >
            <b>Order Details</b>
          </h4>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products &&
                orderDetails.products.map((prod, key) => {
                  return (
                    <tr key={key}>
                      <th>{key + 1}</th>
                      <td>{prod.name}</td>
                      <td>{prod.quantity}</td>
                      <td>{prod.price * prod.quantity}</td>
                    </tr>
                  );
                })}
              <tr className="bg-white">
                <th scope="row"></th>
                <td></td>
                <td>Total</td>
                <td>{orderDetails.amount / 100}</td>
              </tr>
            </tbody>
          </table>

          <ul></ul>
        </div>
      );
    }
  };

  return (
    <Base title="Order placed successfully">
      <div className="">{showOrderDetails()}</div>
    </Base>
  );
}
