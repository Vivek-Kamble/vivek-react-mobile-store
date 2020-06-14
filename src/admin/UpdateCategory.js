import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {
  getCategories,
  getCategory,
  updateCategoryFront,
} from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Loading from "../core/Loading";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    category: "",
    error: "",
    success: "",
    loading: "",
  });

  const { category, error, success, loading } = values;

  const preload = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, category: data.name });
        }
      })
      .catch();
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, category: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateCategoryFront(match.params.categoryId, user._id, token, {
      name: category,
    })
      .then((data) => {
        if (data.error) {
          setTimeout(() => {
            setValues({ ...values, error: data.error, loading: false });
          }, 400);
        } else {
          setTimeout(() => {
            setValues({
              ...values,
              success: true,
              loading: false,
            });
          }, 400);
        }
      })
      .catch();
  };

  const loadingMessage = () => {
    return loading && <Loading />;
    // <div className="alert alert-info">Loading...</div>;
  };

  const successMessage = () => {
    return (
      <div
        style={{ display: success ? "" : "none" }}
        className="alert alert-success"
      >
        Category updated Successfully !!!
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        style={{ display: error ? "" : "none" }}
        className="alert alert-danger"
      >
        Failed to update category !
      </div>
    );
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group ">
          <p className="lead">Enter the Category</p>
          <input
            type="text"
            className="form-control my-3"
            autoFocus
            required
            onChange={handleChange}
            value={category}
            placeholder="For Ex. Best selling Phones "
          />
          <button className="btn btn-primary rounded" onClick={onSubmit}>
            Update Category
          </button>
        </div>
      </form>
    );
  };
  return (
    <Base title="Update category">
      {loadingMessage()}
      <div className="col-md-8 bg-white offset-md-2 border pt-3">
        <div className="col-md-6 offset-md-3 text-center pt-3">
          {successMessage()}
          {errorMessage()}
        </div>
        {myCategoryForm()}
      </div>
    </Base>
  );
};
export default UpdateCategory;
