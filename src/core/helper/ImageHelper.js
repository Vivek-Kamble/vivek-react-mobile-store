import React from "react";

import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : "https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg";
  return <img src={imageurl} height="150px" width="150px" />;
};
export default ImageHelper;
