import { FC, useState, useRef, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { logUserIn } from '../../store/Authentication/authActions';
import classes from './Authentication.module.scss';

const Login: FC = () => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredUserName = userNameRef.current?.value;
    const enteredPassword = passwordRef.current?.value;

    if (enteredUserName && enteredPassword) {
      const logInData = {
        userName: enteredUserName,
        password: enteredPassword,
      };

      dispatch(logUserIn(logInData));
    }
    else setHasSubmitted(true);
  };
  return (
    <Card>
      <h1 className={classes.heading}>Login</h1>
      <form onSubmit={submitHandler}>
        <Input
          id="login"
          type="text"
          label="Username"
          reference={userNameRef}
          hasSubmitted={hasSubmitted}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          reference={passwordRef}
          hasSubmitted={hasSubmitted}
        />
        <Button flat={false}>Log In</Button>
        <Button flat={true} link="/register">
          Dont have an account? Register instead
        </Button>
      </form>
    </Card>
  );
};

export default Login;
