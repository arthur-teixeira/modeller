import React from 'react';
import styles from './GridItem.module.css'

const GridItem = props => {
  return (
    <div className={styles.gridItem}>
      <img src={props.icon} className={styles.icon} />
      <h5>{props.title}</h5>
      <p>
        {props.children}
      </p>
    </div>
  );
}

export default GridItem;
