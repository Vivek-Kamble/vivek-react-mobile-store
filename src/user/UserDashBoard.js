import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getuserOrders } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const { user, token } = isAuthenticated();
  const [orders, setOrders] = useState([]);
  // const [reload, setReload] = useState("");

  async function getorders() {
    const order = await getuserOrders(user._id, token);
    setOrders(order);
    // setReload(!reload);
  }
  useEffect(() => {
    getorders();
  }, []);

  const showUserOrders = (orders) => {
    console.log(orders);
    if (orders) {
      return (
        <table className="table table-striped">
          <thead className="text-center">
            <tr>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Order Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((product, index) => {
              return (
                <tr>
                  <td>
                    <div className=" text-center">
                      <Link key={index} to="/">
                        <h6 className="text-sm text-primary">{product._id}</h6>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div className=" text-center">
                      <h6 className="text-sm text-primary">
                        {product.amount / 100}
                      </h6>
                    </div>
                  </td>
                  <td>
                    <div className=" text-center">
                      <h6 className="text-sm text-primary ">
                        {product.status}
                      </h6>
                    </div>
                  </td>
                  <td>
                    <div className=" text-center">
                      <h6 className="text-sm text-primary">
                        <span>
                          {JSON.stringify(Date(product.createdAt)).slice(1, 11)}
                        </span>
                      </h6>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  return (
    <Base title="UserDashBoard">
      {orders ? (
        showUserOrders(orders)
      ) : (
        <div className="alert-danger">No orders placed</div>
      )}
    </Base>
  );
};

export default UserDashBoard;
