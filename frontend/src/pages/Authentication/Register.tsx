import { useState, useRef, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { registerUser } from '../../store/Authentication/authActions';
import { validatePasswords } from '../../helpers/validation/validatePasswords';
import classes from './Authentication.module.scss';

const Register: React.FC = () => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const dispatch = useDispatch();

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
    const enteredConfirmPassword = confirmPasswordRef.current?.value;

    if (
      enteredFirstName &&
      enteredLastName &&
      enteredUserName &&
      enteredPassword &&
      enteredConfirmPassword
    ) {
      const registerData = {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        userName: enteredUserName,
        password: enteredPassword,
      };
      try {
        validatePasswords(enteredPassword, enteredConfirmPassword);
      } catch (error) {
        console.log(error.message);
        return;
      }
      dispatch(registerUser(registerData));
    } else {
      setHasSubmitted(true);
      if (enteredPassword && enteredConfirmPassword) {
        try {
          validatePasswords(enteredPassword, enteredConfirmPassword);
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };

  const loosingFocusHandler = async () => {
    const enteredUserName = userNameRef.current?.value;

    if (!enteredUserName) return;

    const response: AxiosResponse<{ message: string }> = await axios.get(
      `http://localhost:5000/api/user?login=${enteredUserName}`,
    );

    if (response.data) {
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
        <Input
          id="firstName"
          type="text"
          label="First Name"
          reference={firstNameRef}
          hasSubmitted={hasSubmitted}
        />
        <Input
          id="lastName"
          type="text"
          label="Last Name"
          reference={lastNameRef}
          hasSubmitted={hasSubmitted}
        />
        <Input
          id="userName"
          type="text"
          label="UserName"
          reference={userNameRef}
          onLoosingFocus={loosingFocusHandler}
          hasSubmitted={hasSubmitted}
        />
        {!isValid && <p className={classes.invalidParagraph}>This username already exists.</p>}
        <Input
          id="password"
          type="password"
          label="Password"
          reference={passwordRef}
          hasSubmitted={hasSubmitted}
        />
        <Input
          id="passwordConfirm"
          type="password"
          label="Confirm Password"
          reference={confirmPasswordRef}
          hasSubmitted={hasSubmitted}
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
