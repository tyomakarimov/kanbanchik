import { useRef, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import classes from './Authentication.module.scss';

const Login: React.FC = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredUserName = userNameRef.current?.value;
    const enteredPassword = passwordRef.current?.value;

    const response: AxiosResponse = await axios.post('http://localhost:5000/api/auth/login', {
      login: enteredUserName,
      password: enteredPassword,
    });

    const { data } = response;

    console.log(data.jwt);
  };
  return (
    <Card>
      <h1 className={classes.h1}>Login</h1>
      <form onSubmit={submitHandler}>
        <Input id="login" type="text" label="Username" reference={userNameRef} />
        <Input id="password" type="password" label="Password" reference={passwordRef} />
        <Button flat={false}>Log In</Button>
        <Button flat={true} link="/register">
          Dont have an account? Register instead
        </Button>
      </form>
    </Card>
  );
};

export default Login;
