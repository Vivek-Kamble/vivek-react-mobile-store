import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch();
  };

  const successMessage = () => {
    return (
      <div
        style={{ display: success ? "" : "none" }}
        className="alert alert-success"
      >
        New Category was created successfully.
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        style={{ display: error ? "" : "none" }}
        className="alert alert-danger"
      >
        Failed to create Category !
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group p-4 ">
          <p className="lead">Enter the Category</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            onChange={handleChange}
            value={name}
            placeholder="For Ex. Best selling Phones "
          />
          <button className="btn btn-primary rounded" onClick={onSubmit}>
            Create Category
          </button>
        </div>
      </form>
    );
  };
  return (
    <Base title="Create Category">
      <div className="col-md-8 bg-white offset-md-2 border">
        <div className="col-md-6 offset-md-3 text-center pt-3">
          {successMessage()}
          {errorMessage()}
        </div>
        {myCategoryForm()}
      </div>
    </Base>
  );
};
export default AddCategory;
