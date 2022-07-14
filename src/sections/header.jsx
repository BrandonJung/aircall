import React from 'react';
import AircallLogo from '../components/aircall-logo.jsx';

const Header = (props) => {
    const pageTitle = props.pageTitle ? props.pageTitle : '';
    return (
        <header>
            <div className='header-title'>
                {pageTitle}
            </div>
            <AircallLogo/>
        </header>
    )
};

export default Header;