import React from 'react';
import AuthenticatedGuard from '../components/auth/authentication/authenticatedGuard/AuthenticatedGuard'
const rules=["user"]
const Cart = () => {
  return (
    
      <AuthenticatedGuard routeRules={rules}>
        <div>cart</div>
      </AuthenticatedGuard>
    
  );
};

export default Cart;