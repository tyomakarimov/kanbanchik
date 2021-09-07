import { FC, useState, useRef, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { registerUser } from '../../store/Authentication/authActions';
import { validatePasswords } from '../../helpers/validation/validatePasswords';
import classes from './Authentication.module.scss';

const Register: FC = () => {
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const checkPasswordsAreValid = (password: string, confirmPassword: string) => {
    try {
      validatePasswords(password, confirmPassword);
      setPasswordError(previousValue => {
        if (previousValue) return undefined;
      });
      setPasswordConfirmError(previousValue => {
        if (previousValue) return undefined;
      });
      return true;
    } catch (error) {
      if (error.message === 'Passwords do not match.') {
        setPasswordError(previousValue => {
          if (previousValue) return undefined;
        });
        setPasswordConfirmError(error.message);
      } else setPasswordError(error.message);
      return false;
    }
  };

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
      const validPasswords = checkPasswordsAreValid(enteredPassword, enteredConfirmPassword);
      if (!validPasswords) return;
      dispatch(registerUser(registerData));
    } else {
      setHasSubmitted(true);
      if (enteredPassword && enteredConfirmPassword) {
        checkPasswordsAreValid(enteredPassword, enteredConfirmPassword);
      }
    }
  };

  const userNameChangeHandler = async () => {
    const enteredUserName = userNameRef.current?.value;

    if (!enteredUserName) return;

    const response: AxiosResponse = await axios.get(
      `http://localhost:5000/api/user?login=${enteredUserName}`,
    );

    if (response.data) {
      setUserNameError('This username already exists.');
      return false;
    } else {
      setUserNameError(previousValue => {
        if (previousValue) return undefined;
      });
      return true;
    }
  };

  return (
    <Card>
      <h1 className={classes.heading}>Register</h1>
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
          onChange={userNameChangeHandler}
          hasSubmitted={hasSubmitted}
          errorMessage={userNameError}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          reference={passwordRef}
          hasSubmitted={hasSubmitted}
          error={!!passwordConfirmError}
          errorMessage={passwordError}
        />
        <Input
          id="passwordConfirm"
          type="password"
          label="Confirm Password"
          reference={confirmPasswordRef}
          hasSubmitted={hasSubmitted}
          errorMessage={passwordConfirmError}
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
