import React from 'react';
import styles from './GridItem.module.css'

const GridItem = props => {
  return (
    <div className={styles.gridItem}>
      <h5>{props.title}</h5>
      {props.children}
    </div>
  );
}

export default GridItem;
