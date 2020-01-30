import React from 'react';
import styles from './Heading.module.css'

const Heading = props => {
  return <h1 className={styles.heading}>
    {props.children}
  </h1>;
}

export default Heading;
