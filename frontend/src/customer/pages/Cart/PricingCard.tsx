import { Divider } from '@mui/material'
import React from 'react';
import { useAppSelector } from '../../../State/Store';
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from '../../../util/cartCalculator';

const PricingCard = () => {
  
  const { cart } = useAppSelector((store) => store);

  return (
    <div>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>{sumCartItemMrpPrice(cart.cart?.cartItems || [])} €</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span>
            - {sumCartItemMrpPrice(cart.cart?.cartItems || []) - sumCartItemSellingPrice(cart.cart?.cartItems || [])}
            {" "}€
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>2.75 €</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Plateform fee</span>
          <span className="text-teal-600">0.00 €</span>
        </div>
      </div>
      <Divider />

      <div className="font-medium px-5 py-2 flex justify-between items-center">
        <span>Total</span>
        <span>{sumCartItemSellingPrice(cart.cart?.cartItems || []) + 2.75} €</span>
      </div>
    </div>
  );
 };

export default PricingCard