import React from 'react';
import Logo from './logo';

function Navbar(props) {
    let choosePage = props.choosePage;
    return (
        <div id='portfolioNavbar'>
            <Logo/>
            <h2 className='navItem' onClick={() => choosePage(0)}>Sign Out</h2>
        </div>
    )
}

export default Navbar;