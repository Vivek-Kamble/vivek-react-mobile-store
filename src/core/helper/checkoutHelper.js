import { API } from "../../backend";

export const getPaymentData = (amount, id, token) => {
  return fetch(`${API}/razorpay/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
