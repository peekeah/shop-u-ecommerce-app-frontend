import axios from "axios";
// import { useNavigate } from "react-router-dom";
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
};

const displayRazorpay = async () => {
  const URL = process.env.REACT_APP_API;
  // const navigate = useNavigate();
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load");
  }

  const razorpayKey = await process.env.REACT_APP_RAZORPAY_KEY;

  const data = await axios.post(`${URL}/razorpay/pay`).then((s) => s.data);
  const options = {
    key: razorpayKey,
    amount: "50000",
    currency: data.currency,
    name: "Shop U Inc",
    description: "Thank you for shopping at Shop U",
    image: "/favicon.ico",
    order_id: data.order_id,
    // callback_url: `${document.url}/`,
    // callback_url: ,
    handler: function(response) {
      if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
        // redirect_url = '/you-owe-money.html';
        // navigate('/');
      } else {
        // redirect_url = '/thnx-you-paid.html';
        // navigate('/success');
      }
      // location.href = redirect_url;
    },
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export default displayRazorpay;