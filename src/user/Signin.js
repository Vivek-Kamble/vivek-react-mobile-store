import React, { useState } from "react";
import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
import Loading from "../core/Loading";
import "../styles.css";
import { Redirect } from "react-router-dom";
import login from "../assets/login.png";

const Signin = () => {
  const [values, setValues] = useState({
    email: "test@test.com",
    password: "1234",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setTimeout(() => {
            setValues({ ...values, error: data.error, loading: false });
          }, 400);
        } else {
          authenticate(data, () => {
            setTimeout(() => {
              setValues({ ...values, didRedirect: true });
            }, 400);
          });
        }
      })
      .catch((err) => console.log("abs"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  const loadingMessage = () => {
    return loading && <Loading />;
    // <div className="alert alert-info">Loading...</div>;
  };

  const errorMessage = () => {
    return (
      <div
        style={{ display: error ? "" : "none" }}
        className="alert alert-danger"
      >
        {error}
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="col-md-4 offset-md-4">
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={handleChange("email")}
              value={email}
              type="email"
              autoFocus
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={handleChange("password")}
              value={password}
              type="password"
              className="form-control"
            />
          </div>
          <button
            onClick={onSubmit}
            className="btn btn-primary btn-block mt-4 rounded-pill"
          >
            Login
          </button>
        </form>
      </div>
    );
  };

  return (
    <Base title="Sign In">
      {loadingMessage()}
      <img src={login} className="login" />
      <div className="col-md-4 offset-md-4">{errorMessage()}</div>
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};
export default Signin;
