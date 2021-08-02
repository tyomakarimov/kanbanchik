import { useRef } from 'react';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import classes from './Authentication.module.scss';

const Register: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
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
        <label htmlFor="firstName" className={classes.formLabel}>
          First Name
        </label>
        <input type="text" id="firstName" className={classes.formInput} ref={firstNameRef} />
        <label htmlFor="lastName" className={classes.formLabel}>
          Last Name
        </label>
        <input type="text" id="lastName" className={classes.formInput} ref={lastNameRef} />
        <label htmlFor="userName" className={classes.formLabel}>
          UserName
        </label>
        <input type="text" id="userName" className={classes.formInput} ref={userNameRef} />
        <label htmlFor="password" className={classes.formLabel}>
          Password
        </label>
        <input type="password" id="password" className={classes.formInput} ref={passwordRef} />
        <label htmlFor="passwordConfirm" className={classes.formLabel}>
          Confirm Password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          className={classes.formInput}
          ref={confirmPasswordRef}
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
