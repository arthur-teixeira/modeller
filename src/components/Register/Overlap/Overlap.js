import React, { useState } from 'react';
import styles from './Overlap.module.css'

import { RegisterForm, ConfirmEmailForm } from '../'
import { Link } from 'react-router-dom'

const Overlap = () => {

  const [currentComponent, setCurrentComponent] = useState("register");

  const handleComponentSwitch = () => {
    if (currentComponent === "register")
      setCurrentComponent("confirm");
    else
      setCurrentComponent("register")

  }

  return (
    <div className={styles.overlap}>
      <div className={styles.overlapForm}>

        {currentComponent === "register" ? <RegisterForm handler={handleComponentSwitch} /> : <ConfirmEmailForm handler={handleComponentSwitch} />}
      </div>
      <p>Já possui uma conta? <Link to="/auth/login-page">Acesse agora</Link></p>
    </div>
  );
}

export default Overlap;
