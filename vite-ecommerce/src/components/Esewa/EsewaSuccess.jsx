import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

const EsewaSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const dataParam = queryParams.get('data'); // eSewa sends Base64 data

        if (!dataParam) {
          setError('Payment data missing.');
          setLoading(false);
          return;
        }

        let decoded;
        try {
          decoded = JSON.parse(atob(dataParam)); // decode Base64
        } catch (err) {
          console.error('Error decoding eSewa data:', err);
          setError('Invalid payment data.');
          setLoading(false);
          return;
        }

        const { transaction_uuid, total_amount } = decoded;

        if (!transaction_uuid || !total_amount) {
          setError('Incomplete payment data.');
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('token');

        const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/orders/payment-success`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transactionId: transaction_uuid, totalAmount: total_amount }),
        });

        const data = await res.json();

        if (data.success) {
          dispatch({ type: 'CLEAR_CART' }); // clear cart
          navigate('/orders'); // redirect to orders page
        } else {
          setError(data.message || 'Payment verification failed.');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError('Something went wrong during payment verification.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location.search, dispatch, navigate]);

  if (loading) return <p className="pt-40 text-center">Verifying payment...</p>;
  if (error) return <p className="pt-40 text-center text-red-600">{error}</p>;

  return null; // empty since we redirect automatically
};

export default EsewaSuccess;
