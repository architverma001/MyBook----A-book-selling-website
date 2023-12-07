import React from 'react';
import axios from 'axios';
import './Gpay.css';
import { HmacSHA256 } from 'crypto-js';

function Gpay(props) {
  const price = props.offer;
  
// make 

  const handleOpenRazorpay = async (data) => {
    const options = {


      key: 'rzp_test_ED1PrWcomjc9mw',

      amount: Number(data.order.amount),
      currency: data.order.currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      order_id: data.order.id,
      handler: function (response) {
        console.log('Payment');
        const generate = () => {
          const value = HmacSHA256(`${response.razorpay_order_id}|${response.razorpay_payment_id}`, 'Sz6HYuRoy0izqDrzhVX5ygFu')
            .toString();
          return value;
        };
        console.log('signature', generate());
        const { razorpay_order_id, razorpay_payment_id } = response;
        const postData = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature: generate(),
        };
        axios
          .post('https://backend-ptyq.onrender.com/api/v1/payment/verify', postData)
          .then((res) => {
            console.log(res.data, 'Response');
            props.onSuccess();
          })
          .catch((err) => {
            console.log(err, 'Error');
          });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePrice = async (amount) => {
    const data = { amount: amount*100 };
    axios
      .post('https://backend-ptyq.onrender.com/api/v1/payment', data)
      .then((res) => {
        console.log(res.data, 'Response');
        handleOpenRazorpay(res.data);
      })
      .catch((err) => {
        console.log(err, 'Error');
      });
  };

  return (
    <button onClick={() => handlePrice(price)} className='btn bg-body-danger btn-outline-danger ms-1 me-2'>
     Pay now
    </button>
  );
}

export default Gpay;






