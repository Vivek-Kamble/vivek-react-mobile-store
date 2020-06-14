// import { API } from "../../backend";

export const getPaymentData = (amount) => {
  return fetch(`http://localhost:8000/api/razorpay/`, {
    method: "POST",
    mode: "no-cors",
    body: {
      amount,
    },
  })
    .then((res) => {
      console.log(res.json());
      res.json();
    })
    .catch((err) => console.log(err));
};

//payu trial
// export const payumoney = (amount, user, product) => {
//   //Create a Data object that is to be passed to LAUNCH method of Bolt
//   var pd = {
//     key: "wPRqfmUT",
//     txnid: user._id,
//     amount: amount,
//     firstname: user.name,
//     email: user.email,
//     phone: 8975673350,
//     productinfo: product.name,
//     surl: "/success.com",
//     furl: "/failure.com",
//     hash: "",
//   };

//   // Data to be Sent to API to generate hash.
//   let data = {
//     txnid: pd.txnid,
//     email: pd.email,
//     amount: pd.amount,
//     productinfo: pd.productinfo,
//     firstname: pd.firstname,
//   };
//   //   let self = this;
//   // API call to get the Hash value
//   fetch(API + "/payment/payumoney", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then(function (a) {
//       return a.json();
//     })
//     .then(function (json) {
//       pd.hash = json["hash"];
//       //  With the hash value in response, we are ready to launch the bolt overlay.
//       //Function to launch BOLT
//       redirectToPayU(pd);
//     });
// };
