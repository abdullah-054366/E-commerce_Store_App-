import { useEffect } from "react";
import Moyasar from "moyasar-payment-form";
import "moyasar-payment-form/dist/moyasar.css";


export default function MoyasarPayment({ total }) {




  useEffect(() => {
    Moyasar.init({
      element: ".mysr-form",

      // المبلغ بالهللات
      amount: total * 100,

      currency: "SAR",

      description: "طلب جديد",

      publishable_api_key: "pk_test_6yFSjqyJVB8Tkbka1ismFS5yVng5c7HeDZzXdNqg",

      callback_url: "http://localhost:5173/checkout",

      methods: ["creditcard"],

      supported_networks: [
        "visa",
        "mastercard",
        "mada",
      
      ],
    });
  }, [total]);



  return <div className="mysr-form"></div>;
}