import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/orders/getorders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          const paidOrders = data.orders.filter(order => order.paymentStatus === 'paid');
          setOrders(paidOrders);
        } else {
          alert('Failed to fetch orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        alert('Error fetching orders');
      }
    };
    fetchOrders();
  }, [dispatch]);

  if (orders.length === 0)
    return (
      <p className="pt-40 text-center text-gray-600 text-lg">
        No orders yet.
      </p>
    );

  return (
    <div className="mx-auto py-12 px-4 m-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Orders
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Order ID: {order.transactionId}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.paymentStatus === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-600 mb-4">
              Total Amount:{' '}
              <span className="font-semibold text-gray-800">
                Rs. {order.totalAmount}
              </span>
            </p>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Products:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {order.products.map(p => (
                  <li key={p.productId._id}>
                    <span className="font-medium text-gray-800">{p.productId.title}</span>{' '}
                    - {p.qty} x Rs. {p.price}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Delivery Info:</h3>
              <p className="text-gray-600">{order.deliveryInfo.fullName}, {order.deliveryInfo.phone}</p>
              <p className="text-gray-600">
                {order.deliveryInfo.address}, {order.deliveryInfo.district}, {order.deliveryInfo.province}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
