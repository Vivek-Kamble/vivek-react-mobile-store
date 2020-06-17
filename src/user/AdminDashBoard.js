import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import "./admindash.css";
import Charts from "./Chart";
const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftside = () => {
    return (
      <div className="card text-center">
        <h5 className="card-header text-primary bg-dark text-warning border border-primary">
          Admin navigation
        </h5>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRightside = () => {
    return <Charts />;
  };
  return (
    <Base title="Welcome to Admin Dashboard" className="container p-2">
      <div className="row mt-5">
        <div className="col-3">{adminLeftside()}</div>
        <div className="col-7">{adminRightside()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
