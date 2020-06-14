import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import Loading from "../core/Loading";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch();
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    setloading(true);
    deleteProduct(user._id, token, productId)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setTimeout(() => {
            setloading(false);
          }, 400);
        } else {
          setTimeout(() => {
            setloading(false);
          }, 400);
          preload();
        }
      })
      .catch((err) => console.log(err));
  };

  const loadingMessage = () => {
    return loading && <Loading />;
    // <div className="alert alert-info">Loading...</div>;
  };

  return (
    <Base title="Manage Products">
      {loadingMessage()}
      <div className="row col-md-8 offset-md-2">
        <h4 className="text-center text-dark my-3 col-12">
          Total {products.length} products
        </h4>
        <table className="table table-striped">
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="row text-center">
                      <div className="col-4">
                        <h5 className="text-sm text-primary text-left ml-5 mt-2">
                          {product.name}
                        </h5>
                      </div>
                      <div className="col-4 pt-1">
                        <Link
                          className="btn btn-sm btn-success rounded"
                          to={`/admin/product/update/${product._id}`}
                        >
                          <span className="">Update</span>
                        </Link>
                      </div>
                      <div className="col-4 pt-1">
                        <button
                          onClick={() => {
                            deleteThisProduct(product._id);
                          }}
                          className=" btn btn-sm btn-danger rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Base>
  );
};
export default ManageProducts;
