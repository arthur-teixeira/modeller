import React from 'react';
import { Heading } from '../../Utils'

import styles from './ConfirmEmailForm.module.css'

const ConfirmEmailForm = props => {
  return (
    <>
      <Heading>Confirme seu email</Heading>
      <form className={styles.ConfirmEmailForm}>
        <p>
          Enviamos um código para o email <span>johndoe@gmail.com</span>, para concluir o seu cadastro,
          insira o código no campo abaixo:
      </p>
        <input type="number" maxLength={5} />
        <p className={styles.sml}>
          (se o email nâo chegar nos próximos 2 minutos, verifique sua
          caixa de Spam ou reenvie o código)
        </p>

        <button className="btn-sml">Concluir cadastro ></button>
        <button className="btn-sml">Reenviar código</button>
        <button className={styles.emailBtn} onClick={props.handler}> {"<"} Alterar meu email  </button>
        <p className={styles.sml}>Ao criar uma conta você estará concordando com a Política
          de Privacidade, Termos e Condições e uso de Cookies.</p>
      </form>
    </>
  );
}

export default ConfirmEmailForm;
