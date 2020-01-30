import React from 'react';
import styles from './RegisterForm.module.css'

const RegisterForm = () => {
  return (
    <form className={styles.registerForm}>
      <input type="text" name="name" placeholder="Seu nome" />
      <input type="text" name="enterprise" placeholder="Nome da empresa" />
      <input type="email" name="email" placeholder="Seu email" />
      <input type="password" name="password" placeholder="Senha" />
      <input type="password" name="confirmPassword" placeholder="Confirmar senha" />

      <button type="submit" className="btn">Criar conta ></button>

      <p className="muted">Ao criar uma conta você estará concordando com a Política
          de Privacidade, Termos e Condições e uso de Cookies.</p>
    </form>
  );
}

export default RegisterForm;
