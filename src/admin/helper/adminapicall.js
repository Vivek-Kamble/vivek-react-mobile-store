import { API } from "../../backend";

//category calls
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//update a Category
export const updateCategoryFront = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//get category
export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//product calls

//create a product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get all products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//delete a product
export const deleteProduct = (userId, token, productId) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("backend", response);
      return response.json();
    })
    .catch((err) => {
      console.log("BACk err", err);
    });
};

//get a product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//update a product
export const updateProduct = (userId, token, product, productId) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
