import React from 'react';
import styles from './RegisterForm.module.css'
import { Heading } from '../../Utils'

const RegisterForm = props => {

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <>
      <Heading>Comece agora mesmo!</Heading>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <input type="text" name="name" placeholder="Seu nome" />
        <input type="text" name="enterprise" placeholder="Nome da empresa" />
        <input type="email" name="email" placeholder="Seu email" />
        <input type="password" name="password" placeholder="Senha" />
        <input type="password" name="confirmPassword" placeholder="Confirmar senha" />

        <button className="btn" onClick={props.handler}>Criar conta ></button>

        <p className="muted">Ao criar uma conta você estará concordando com a Política
          de Privacidade, Termos e Condições e uso de Cookies.</p>
      </form>
    </>
  );
}

export default RegisterForm;
