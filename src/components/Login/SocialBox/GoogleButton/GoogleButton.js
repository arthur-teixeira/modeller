import React from 'react';
import { SocialButton } from '../../../Utils'
import img from './google.png'

const GoogleButton = () => {
  return (
    <SocialButton>
      <img src={img} alt="google" className="socialIcon" />
      Acesse com o google
    </SocialButton>
  );
}

export default GoogleButton;
