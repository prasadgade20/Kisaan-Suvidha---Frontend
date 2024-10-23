import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import "./payment.css";
import { useState } from "react";
// import { createOrder, clearErrors } from "../actions/orderAction";

const Payment = ({ history }) => {
    const location = useLocation();
    const [productData, setProductData] = useState(location.state)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  console.log(location.state)

//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const data = useSelector((state) => state?.user?.getUserByIdData?.data);
//   const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: productData.iMonth === 0 ? productData.vPrice * 100 : productData.vPrice * productData.iMonth * 100,
  };

  let order = {
    amount: productData.iMonth === 0 ? productData.vPrice : productData.vPrice * productData.iMonth,
    sender: data.iUserId,
    receiver: productData?.iUserId, 
    validTill: "2024-03-30 00:09:04"
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5007/api/payment/processPayment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: data.vFirstName + data.vLastName,
            phone: data.vPhone,
          },
        },
      });

          payBtn.current.disabled = false;
          order = {
            ...order,
            transactionId: result.paymentIntent.id,
            status: result.paymentIntent.status,
            iProductId: productData.iProductId
          };
          
        await axios.post(
            "http://localhost:5007/api/order/createOrder",
            order,
            config
          ).catch(err => {
            console.log(err)
          });

          toast.success("Payment Successful", 'Ippōtu nīṅkaḷ urimaiyāḷar')
          setTimeout(()=> {
            navigate("/");
          }, 3000)
          
    
    } catch (error) {
      payBtn.current.disabled = false;
    }
  };

//   useEffect(() => {
//     if (error) {
//     //   dispatch(clearErrors());
//     }
//   }, [dispatch, error]);

  return (
    <Fragment>
      <ToastContainer />
        <br />
        <br />
        <br />
        <br />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          Card Info
          <div>
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${productData && productData.iMonth === 0 ? productData.vPrice : productData.vPrice * productData.iMonth}`}
            ref={payBtn}
            className="paymentFormBtn rounded-lg"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;