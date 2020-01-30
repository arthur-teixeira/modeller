import React from 'react';
import styles from './Overlap.module.css'
import { Heading } from '../../Utils'
import { RegisterForm } from '../'

const Overlap = () => {
  return (
    <div className={styles.overlap}>
      <div className={styles.overlapForm}>
        <Heading>Comece agora mesmo!</Heading>
        <RegisterForm />
      </div>
      <p>Já possui uma conta? <a href="/">Acesse agora</a></p>
    </div>
  );
}

export default Overlap;
