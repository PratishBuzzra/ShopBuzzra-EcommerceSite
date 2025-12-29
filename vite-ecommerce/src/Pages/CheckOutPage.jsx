import React, { useState, useContext } from 'react';
import DeliveryInfo from '../components/DeliveryInfo';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';
import EsewaPayForm from '../components/Esewa/EsewaPayForm';

const base_url = import.meta.env.VITE_API_URL;

const CheckOutPage = () => {
  const { totalItems, totalPrice, cart, dispatch } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [deliveryData, setDeliveryData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    province: ''
  });

  const [createdOrder, setCreatedOrder] = useState(null); 

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      alert('Please login to place an order');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${base_url}/v1/orders/createorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          products: cart.map(item => ({ productId: item._id, qty: item.qty })),
          deliveryInfo: deliveryData,
          totalAmount: totalPrice,
          paymentMethod: 'esewa'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setCreatedOrder(data.order); 
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Something went wrong, try again');
    }
  };

  return (
    <div className="pt-40 min-h-[80vh] bg-blue-50 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-6">
        <div>
          <DeliveryInfo deliveryData={deliveryData} setDeliveryData={setDeliveryData} />
        </div>

        <div>
          <div className="bg-gray-50 shadow-md rounded-md p-4">
            <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
            <p className="mb-2">Total Items: {totalItems}</p>
            <p className="mb-3">Total Price: {totalPrice}</p>

            <h3 className="text-2xl py-3">Payment Method</h3>
            <div className="flex">
              <img
                src="/src/assets/HeroBanner/esewa.webp.png"
                alt="esewa"
                className="h-20 mx-4"
              />
            </div>

          
            {!createdOrder && (
              <div className="mt-4">
                <button
                  onClick={handlePlaceOrder}
                  className="bg-blue-600 text-white w-full py-3 rounded"
                >
                  Place Order
                </button>
              </div>
            )}

          {createdOrder && (
            <div className="mt-4">
              <EsewaPayForm
                totalAmount={createdOrder.totalAmount}
                transactionId={createdOrder.transactionId}
                onPaymentSuccess={() => {
                  dispatch({ type: 'CLEAR_CART' });
                  navigate('/orders');
                }}
                />
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
