import React from 'react';

import styles from './SocialButton.module.css'

const SocialButton = props => {
  return (
    <button className={styles.social}>
      {props.children}
    </button>
  );
}

export default SocialButton
