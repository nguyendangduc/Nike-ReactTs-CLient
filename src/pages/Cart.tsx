import React from 'react';
import AuthenticatedGuard from '../components/auth/authentication/authenticatedGuard/AuthenticatedGuard'
const Cart = () => {
  return (
    
      <AuthenticatedGuard>
        <div>cart</div>
      </AuthenticatedGuard>
    
  );
};

export default Cart;