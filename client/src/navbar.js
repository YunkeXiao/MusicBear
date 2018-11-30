import React from 'react';
import Logo from './logo.js';

function Navbar(props) {
    let choosePage = props.choosePage;
    return (
        <div id='navbar'>
            <Logo/>
            <h2 className='navItem' onClick={() => choosePage(1)}>Sign In</h2>
            <h2 className='navItem' onClick={() => choosePage(2)}>Sign Up</h2>
        </div>
    )
}

export default Navbar;