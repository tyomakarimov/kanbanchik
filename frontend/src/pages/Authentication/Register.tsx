import { useState, useRef, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import classes from './Authentication.module.scss';

const Register: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredFirstName = firstNameRef.current?.value;
    const enteredLastName = lastNameRef.current?.value;
    const enteredUserName = userNameRef.current?.value;
    const enteredPassword = passwordRef.current?.value;

    const response: AxiosResponse = await axios.post('http://localhost:5000/api/auth/register', {
      name: enteredFirstName,
      surname: enteredLastName,
      login: enteredUserName,
      password: enteredPassword,
    });

    const { data } = response;

    console.log({ token: data.jwt });
  };

  const loosingFocusHandler = async () => {
    const enteredUserName = userNameRef.current?.value;

    if (!enteredUserName) return;

    const response: AxiosResponse = await axios.get(
      `http://localhost:5000/api/user?login=${enteredUserName}`,
    );

    if (!response.data.message) {
      setIsValid(false);
      return false;
    } else {
      setIsValid(true);
      return true;
    }
  };

  return (
    <Card>
      <h1 className={classes.h1}>Register</h1>
      <form onSubmit={submitHandler}>
        <Input id="firstName" type="text" label="First Name" reference={firstNameRef} />
        <Input id="lastName" type="text" label="Last Name" reference={lastNameRef} />
        <Input
          id="userName"
          type="text"
          label="UserName"
          reference={userNameRef}
          onLoosingFocus={loosingFocusHandler}
        />
        {!isValid && <p className={classes.invalidParagraph}>This username already exists.</p>}
        <Input id="password" type="password" label="Password" reference={passwordRef} />
        <Input
          id="passwordConfirm"
          type="password"
          label="Confirm Password"
          reference={confirmPasswordRef}
        />
        <Button flat={false}>Register</Button>
        <Button flat={true} link="/login">
          Already have an account? Log in instead
        </Button>
      </form>
    </Card>
  );
};

export default Register;
