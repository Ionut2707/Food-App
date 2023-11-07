import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const fetchData = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const data = await fetch(`http://localhost:5001/api/myOrderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
      const response = await data.json();
      setOrders(response.orderData.order_data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(orders);

  
 return (
   <div className="container mt-5">
     <h1 className="fs-2 bg">My Orders</h1>

     {orders?.map((order, index) => (
       <div className="border p-3 my-3" key={index}>
         <h2>Order No: {index + 1}</h2>
         <h3 className="mb-2">Order Date: {order.Order_date}</h3>

         {Object.values(order).map((item, index) => (
           <div key={index}>
             {item.product !== undefined && (
               <div>
                 <strong>Product:</strong> {item.product}
               </div>
             )}
             {item.qty !== undefined && (
               <div>
                 <strong>Quantity:</strong> {item.qty}
               </div>
             )}
             {item.qty !== undefined && (
               <div>
                 <strong>Price:</strong> {item.price} $
               </div>
             )}
           </div>
         ))}
       </div>
     ))}
     <div className="btn bg-success text-white d-flex justify-content-center fs-4">
       <Link to="/">
         <button className="btn bg-success text-white">Back to Main Page</button>
       </Link>
     </div>
   </div>
 );
}
