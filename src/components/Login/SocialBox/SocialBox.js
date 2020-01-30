import React from 'react';
import FacebookButton from './FacebookButton/FacebookButton'
import GoogleButton from './GoogleButton/GoogleButton'
import styles from './SocialBox.module.css'


const SocialBox = () => {
  return (
    <form className={styles.social}>
      <FacebookButton />
      <GoogleButton />
    </form>
  );
}

export default SocialBox;
