import { API } from "../../backend";

export const getPaymentData = async (data) => {
  console.log(data);
  return fetch(`${API}/razorpay`, {
    method: "POST",
    Accept: "application/json",
    "Content-Type": "application/json",
    body: { data },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
