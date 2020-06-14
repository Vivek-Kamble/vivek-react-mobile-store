import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {
  getCategories,
  getProduct,
  updateProduct,
  getCategory,
} from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Loading from "../core/Loading";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });
  const {
    name,
    description,
    stock,
    price,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          preloadCategories();
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            stock: data.stock,
            formData: new FormData(),
          });
        }
      })
      .catch();
  };

  const preloadCategories = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            categories: data,
            formData: new FormData(),
          });
        }
      })
      .catch();
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(user._id, token, formData, match.params.productId)
      .then((data) => {
        if (data.error) {
          setTimeout(() => {
            setValues({ ...values, error: data.error, loading: false });
          }, 400);
        } else {
          setTimeout(() => {
            setValues({
              ...values,
              name: "",
              description: "",
              price: "",
              photo: "",
              stock: "",
              formData: "",
              loading: false,
              createdProduct: data.product.name,
            });
          }, 400);
        }
      })
      .catch();
  };

  const loadingMessage = () => {
    return loading && <Loading />;
  };

  const successMessage = () => {
    return (
      <div
        style={{ display: createdProduct ? "" : "none" }}
        className="alert alert-success"
      >
        {createdProduct} updated Successfully !!!
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        style={{ display: error ? "" : "none" }}
        className="alert alert-danger"
      >
        Failed to create Product !
      </div>
    );
  };

  const createProductForm = () => (
    <form className="pb-3">
      <div className="row">
        <div className="col-3 offset-2">
          <span className="text">Post photo</span>
        </div>
        <div className="col-3">
          <div className="form-group">
            <label className="btn btn-primary">
              <input
                onChange={handleChange("photo")}
                type="file"
                name={photo}
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          // name={name}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          // name={description}
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>select</option>

          {categories &&
            categories.map((cate, index) => (
              <option className="p-2" key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-primary rounded"
      >
        Update Product
      </button>
    </form>
  );
  return (
    <Base title="Update product details">
      {loadingMessage()}
      <div className="col-md-8 bg-white offset-md-2 border">
        <div className="col-md-6 offset-md-3 text-center pt-3">
          {successMessage()}
          {errorMessage()}
        </div>
        {createProductForm()}
      </div>
    </Base>
  );
};
export default UpdateProduct;
