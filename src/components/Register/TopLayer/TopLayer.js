import React from 'react';
import styles from './TopLayer.module.css'
import img from '../../../logo_02.png'


const TopLayer = () => {
  return (
    <div className={styles.topLayer}>
      <div>
        <img src={img} className={styles.logo} alt="logo" />
        <p className={styles.lead}>
          É uma ferramenta inovadora que irá revolucionar processos
          na sua empresa e conectá-la com seus parceiros!
        </p>
      </div>
    </div>
  );
}

export default TopLayer;
