import React, { useContext } from 'react';
import { CartContext } from '../utils/CartContext';

export const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  return (
    <div>
      items in cart : {cart.length} <br></br>
      total price: 0;
    </div>
  );
};
