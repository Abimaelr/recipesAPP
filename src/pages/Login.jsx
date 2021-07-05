import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import LoginContext from '../context/LoginContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { successLogin, getDoneRecipes, getInProgressRecipes } = useContext(LoginContext);
  const history = useHistory();

  function handleSumit(event) {
    event.preventDefault();
    successLogin(email);

    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    getDoneRecipes();
    getInProgressRecipes();
    history.push('/comidas');
  }

  function validateLogin() {
    const validator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const PASSWORD_MIN_LENGHT = 6;
    if (password.length > PASSWORD_MIN_LENGHT && validator.test(email)) {
      return true;
    }
    return false;
  }

  return (
    <section>
      <h1>Login</h1>
      <Form onSubmit={ handleSumit }>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={ email }
            data-testid="email-input"
            type="email"
            placeholder="Email"
            onChange={ (event) => setEmail(event.target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            value={ password }
            data-testid="password-input"
            type="password"
            placeholder="Senha"
            onChange={ (event) => setPassword(event.target.value) }
          />
        </Form.Group>
        <Button
          data-testid="login-submit-btn"
          variant="primary"
          type="submit"
          disabled={ !validateLogin() }
        >
          Entrar
        </Button>
      </Form>
    </section>
  );
}

export default Login;
