import { useRef } from 'react';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import classes from './Authentication.module.scss';

const Login: React.FC = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredUserName = userNameRef.current?.value;
    const enteredPassword = passwordRef.current?.value;

    console.log({ enteredUserName, enteredPassword });
  };
  return (
    <Card>
      <h1 className={classes.h1}>Login</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="login" className={classes.formLabel}>
          Username
        </label>
        <input type="text" id="login" className={classes.formInput} ref={userNameRef} />
        <label htmlFor="password" className={classes.formLabel}>
          Password
        </label>
        <input type="password" id="password" className={classes.formInput} ref={passwordRef} />
        <Button flat={false}>Log In</Button>
        <Button flat={true} link="/register">
          Dont have an account? Register instead
        </Button>
      </form>
    </Card>
  );
};

export default Login;
