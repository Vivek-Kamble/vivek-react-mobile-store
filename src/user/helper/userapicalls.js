import { API } from "../../backend";

export const getuserOrders = (userId, token) => {
  return fetch(`${API}/get/orders/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
