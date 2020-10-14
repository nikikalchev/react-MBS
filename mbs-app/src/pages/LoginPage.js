import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm'

function LoginPage({...rest}) {
  return (
    <div className="login" >
      <LoginForm {...rest} />
    </div>
  );
}

export default LoginPage;