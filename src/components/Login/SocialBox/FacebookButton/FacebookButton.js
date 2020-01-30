import React from 'react';
import { SocialButton } from '../../../Utils'
import img from './facebook.png'

const FacebookButton = () => {
  return (
    <SocialButton>
      <img src={img} alt="facebook" className="socialIcon" />
      Acesse com o facebook
    </SocialButton>
  );
}

export default FacebookButton;
