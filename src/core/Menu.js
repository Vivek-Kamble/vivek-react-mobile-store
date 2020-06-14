import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles.css";
import { isAuthenticated, signout } from "../auth/helper";
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#0A79DF" };
  } else {
    return { color: "#2C3335" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-white p-2">
        <li
          className="nav-item font-weight-bold"
          // style={{ background: "#3498DB" }}
        >
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item font-weight-bold">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item font-weight-bold">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item font-weight-bold">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <React.Fragment>
            <li className="nav-item font-weight-bold">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item font-weight-bold">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </React.Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item font-weight-bold">
            <span
              className="nav-link text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Sign Out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};
export default withRouter(Menu);
