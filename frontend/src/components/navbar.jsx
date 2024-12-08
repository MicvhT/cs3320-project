import { Link } from 'react-router-dom';
import React from 'react';
import './navbar.css';

export default function Navbar() {
  return (
    <div id='main-content'>
      <h1 id='heading'>Library Books</h1>
      <div id='books'>
        {/* Link to the Available Books page */}
        <Link to='/available' target='_'>
          <h2 id='available'>Available Books</h2>
        </Link>
        
        <h2 id='divider'> | </h2>
        
        {/* Link to the Checked-Out Books page */}
        <Link to='/checkout' target='_'>
          <h2 id='checked-out'>Checked-Out Books</h2>
        </Link>
        
        <h2 id='divider'> | </h2>
        
        {/* Link to the Add Book page */}
        <Link to='/add-book' target='_'>
          <h2 id='add-book'>Add Book</h2>
        </Link>
      </div>
    </div>
  );
}
