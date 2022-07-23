import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <ul className='navbar-ul'>
                <li><Link style={{textDecoration:'none'}} to='/'>Home</Link></li>
                <li><Link style={{textDecoration:'none'}} to='/'>Portfolio</Link></li>
                <li><Link style={{textDecoration:'none'}} to='/'>About</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;