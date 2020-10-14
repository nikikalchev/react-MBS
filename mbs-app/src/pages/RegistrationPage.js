import React from 'react';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm'

function RegistrationPage({...rest}) {
  return (
    <div className="login">
      <RegistrationForm {...rest} />
    </div>
  );
}

export default RegistrationPage;