import React from 'react';
import PaymentRoute from '../components/PrivateRoutes/PaymentRoute';
interface Props {}

const payment = (props: Props) => {
  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

export default PaymentRoute(payment);
