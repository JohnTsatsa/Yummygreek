import React from 'react';

function NavbarButton({ location, navigate }) {
  const buttonText = () => {
    return location.pathname === '/dishes/order' ? 'Add more dishes' : 'Check your order';
  };

  const navigationUrl = () => {
    return location.pathname === '/dishes/order' ? '/dishes' : '/dishes/order';
  };

  return (
    <button
      onClick={() => navigate(navigationUrl())}
      className='navbar-button'>
      {buttonText()}
    </button>
  );
}

export default NavbarButton;
