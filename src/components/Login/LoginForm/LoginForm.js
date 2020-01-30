import React from 'react';
import styles from './LoginForm.module.css'

const LoginForm = () => {
  return (
    <form className={styles.loginForm}>
      <p className="danger">Email ou senha incorretos</p>
      <input type="text" placeholder="Usuário ou email" />
      <input type="password" placeholder="Senha" />
      <a href="/">Esqueceu sua senha?</a>
      <button type=" submit" className="btn">Login ></button>
    </form>
  );
}

export default LoginForm;
