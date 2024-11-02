import React from 'react';

const Footer = () => {
  return (
    <div className='bg-dark text-light p-4'>
      <div className='container'>
        <div className='row'>
          <div className='col text-center'>
            <h6>© {new Date().getFullYear()} Expense Tracker</h6>
            <p className='mb-0'>All rights reserved.</p>
            <p className='mb-0'>Your reliable tool for managing expenses effectively.</p>
            <p className='mb-0'>Contact us: <a href="mailto:support.expensetracker@gmail.com" className='text-light'>support.expensetracker@gmail.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
