import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategories } from "./helper/adminapicall";
import Loading from "../core/Loading";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setloading] = useState(false);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch();
  };

  useEffect(() => {
    preload();
  }, []);

  const loadingMessage = () => {
    return loading && <Loading />;
    // <div className="alert alert-info">Loading...</div>;
  };

  return (
    <Base title="Manage Categories">
      {loadingMessage()}
      <div className="row col-md-8 offset-md-2">
        <h4 className="text-center text-dark my-3 col-12">
          Total {categories.length} categories
        </h4>
        <table className="table table-striped">
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="row text-center">
                      <div className="col-4">
                        <h5 className="text-sm text-primary text-left ml-5 mt-2">
                          {category.name}
                        </h5>
                      </div>
                      <div className="col-4 pt-1">
                        <Link
                          className="btn btn-sm btn-success rounded"
                          to={`/admin/category/update/${category._id}`}
                        >
                          <span className="">Update</span>
                        </Link>
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
export default ManageCategories;
