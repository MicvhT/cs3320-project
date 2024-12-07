import { Link } from 'react-router-dom'
import React from 'react'
import './navbar.css';

export default function Navbar(){


    return(
        <div id='main-content'>
            <h1 id='heading'>Library Books</h1>
            <div id='books'>
                <Link to='/available' target='_'><a><h2 id='available'>Available Books</h2></a></Link>
                <h2 id='divider'> | </h2>
                <Link to='/checkout' target='_'><a><h2 id='checked-out'>Checked-Out Books</h2></a></Link>
            </div>
        </div>
    )


}