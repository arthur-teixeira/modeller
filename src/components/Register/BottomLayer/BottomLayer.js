import React from 'react';
import styles from './BottomLayer.module.css'
import { GridItem } from '../../Utils'

const gridItems = [
  {
    title: 'B2B Connections',
    body: 'Easily make connections with companies and start working together'
  },
  {
    title: 'IT for everyone',
    body: 'An easy way to connect web services and API.'
  },
  {
    title: 'Automated Modelling',
    body: ' Kanban data automatically create a process model.'
  },
  {
    title: 'Customer-centric',
    body: 'We\'re working with users to provide a tool that fits their needs.'
  },
  {
    title: 'Data coherence',
    body: ' Use Temporal or Relational data as you need.'
  },
  {
    title: 'Kanban',
    body: 'Easily run sequential or parallel processes in a kanban board.'
  }
]

const BottomLayer = () => {
  return (
    <div className={styles.bottomLayer}>
      <div className={styles.gridWrapper}>
        {
          gridItems.map((item, i) => (
            <GridItem key={i} title={item.title}>
              {item.body}
            </GridItem>
          ))
        }
      </div>
    </div>
  );
}

export default BottomLayer