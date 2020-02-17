import React from 'react';
import styles from './BottomLayer.module.css'
import { GridItem } from '../../Utils'
import * as icons from './icons'

const gridItems = [
  {
    title: 'B2B Connections',
    body: 'Easily make connections with companies and start working together',
    icon: icons.bToB
  },
  {
    title: 'IT for everyone',
    body: 'An easy way to connect web services and API.',
    icon: icons.it
  },
  {
    title: 'Automated Modelling',
    body: ' Kanban data automatically create a process model.',
    icon: icons.automod
  },
  {
    title: 'Customer-centric',
    body: 'We\'re working with users to provide a tool that fits their needs.',
    icon: icons.ctmrc
  },
  {
    title: 'Data coherence',
    body: ' Use Temporal or Relational data as you need.',
    icon: icons.datac
  },
  {
    title: 'Kanban',
    body: 'Easily run sequential or parallel processes in a kanban board.',
    icon: icons.kanban
  }
]

const BottomLayer = () => {
  return (
    <div className={styles.bottomLayer}>
      <div className={styles.gridWrapper}>
        {
          gridItems.map((item, i) => (
            <GridItem key={i} title={item.title} icon={item.icon}>
              {item.body}
            </GridItem>
          ))
        }
      </div>
    </div>
  );
}

export default BottomLayer