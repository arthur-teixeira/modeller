import React from 'react';
import styles from './Header.module.css'

import img from '../../../logo_02.png'

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={img} className={styles.logo} alt="logo" />
    </div>
  );
}

export default Header;
