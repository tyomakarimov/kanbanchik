import { useRef } from 'react';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import classes from './Authentication.module.scss';

const Register: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredFirstName = firstNameRef.current?.value;
    const enteredLastName = lastNameRef.current?.value;
    const enteredUserName = userNameRef.current?.value;
    const enteredPassword = passwordRef.current?.value;
    const enteredPasswordConfirm = confirmPasswordRef.current?.value;

    console.log({
      enteredFirstName,
      enteredLastName,
      enteredUserName,
      enteredPassword,
      enteredPasswordConfirm,
    });
  };

  return (
    <Card>
      <h1 className={classes.h1}>Register</h1>
      <form onSubmit={submitHandler}>
        <Input id="firstName" type="text" label="First Name" reference={firstNameRef} />
        <Input id="lastName" type="text" label="Last Name" reference={lastNameRef} />
        <Input id="userName" type="text" label="UserName" reference={userNameRef} />
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
