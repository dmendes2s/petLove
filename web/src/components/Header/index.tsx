import React from 'react';

import './style.scss'
import logo from '../../assets/img/logo.png';

const Header: React.FC = () => {
  return (
    <header>
        <img src={logo} alt="logo" title="logo"/>      
    </header>
  );
}

export default Header;
