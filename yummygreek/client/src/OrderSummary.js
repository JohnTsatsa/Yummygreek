import React from 'react';

function OrderSummary({ totalOrder, orderedItems }) {
  return (
    <div className="order-summary">
      <h2>Your Order</h2>
      {orderedItems.map((item, index) => (
        <div key={index} className='summary-order-item'>
          <p>{item.name}</p>
          <img
            src={item.image}
            alt={item.name}
            className='summary-order-item-image'
          />
          <p>x{item.quantity}</p>
          <p>${item.totalPrice}</p>
        </div>
      ))}
      <p className='total-order'>Total Order: ${totalOrder}</p>
      <button className='order-button'>Let's eat</button>
    </div>
  );
}

export default OrderSummary;
