import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("signup ", err));
  };

  const successMessage = () => {
    return (
      <div
        style={{ display: success ? "" : "none" }}
        className="alert alert-success"
      >
        New account was created successfully. Please{" "}
        <Link to="/signin"> Login Here</Link>
      </div>
    );
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

  const signUpForm = () => {
    return (
      <div className="col-md-4 offset-md-4">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              autoFocus
              onChange={handleChange("name")}
              className="form-control"
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              onChange={handleChange("email")}
              className="form-control"
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={handleChange("password")}
              className="form-control"
              value={password}
            />
          </div>

          <button
            onClick={onSubmit}
            className="btn btn-primary btn-block mt-4 rounded-pill"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  };
  return (
    <Base title="Sign Up">
      <div className="col-md-4 offset-md-4">
        {successMessage()}
        {errorMessage()}
      </div>
      {signUpForm()}
    </Base>
  );
};
export default Signup;
