import axios from "axios";

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