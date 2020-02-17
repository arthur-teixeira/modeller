import React from 'react'
import { SocialBox, LoginForm } from '../'
import { Heading } from '../../Utils'
import styles from './overlap.module.css'
import { Link } from 'react-router-dom'

const Overlap = () => {
  return (
    <>
      <div className={styles.overlap}>
        <Heading>Acesse sua conta</Heading>
        <div className={styles.overlapForm}>
          <SocialBox />
        </div>
        <div className={styles.overlapForm}>
          <LoginForm />
        </div>
        <p className="access">Não possui uma conta? <Link to="/auth/register-page">Crie uma agora =)</Link></p>
      </div>
    </>
  )
}

export default Overlap