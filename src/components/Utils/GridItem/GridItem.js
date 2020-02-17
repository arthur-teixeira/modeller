import React from 'react';
import styles from './GridItem.module.css'

const GridItem = props => {
  return (
    <div className={styles.gridItem}>
      <img src={props.icon} className={styles.icon} align="left" />
      <div>
        <h5>{props.title}</h5>
        {props.children}
      </div>
    </div>
  );
}

export default GridItem;
