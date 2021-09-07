import { FC, useState, RefObject } from 'react';
import classes from './Input.module.scss';

interface Props {
  id: string;
  type: string;
  label: string;
  reference: RefObject<HTMLInputElement>;
  hasSubmitted: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: () => Promise<boolean | undefined>;
}

const Input: FC<Props> = props => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const classNames = [classes.formInput, isEmpty || !isValid ? classes.invalidInput : ''];

  const checkIsValid = async () => {
    if (!props.reference.current?.value) setIsEmpty(true);
    else setIsEmpty(false);
    if (props.onChange) (await props.onChange()) ? setIsValid(true) : setIsValid(false);
  };

  const blurHandler = async () => {
    if (!isTouched) setIsTouched(true);
    await checkIsValid();
  };

  const changeHandler = async () => {
    if (!isTouched) return;
    await checkIsValid();
  };

  const checkIsEmpty = () => {
    if (!isEmpty && !props.reference.current?.value) {
      setIsEmpty(true);
      setIsTouched(true);
    }
  };

  if (props.hasSubmitted) checkIsEmpty();
  if ((props.error || props.errorMessage) && isValid) setIsValid(false);

  return (
    <>
      <label htmlFor={props.id} className={classes.formLabel}>
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        className={classNames.join(' ')}
        ref={props.reference}
        onBlur={blurHandler}
        onChange={changeHandler}
        autoComplete="off"
      />
      {isEmpty && <p className={classes.invalidParagraph}>This field cannot be empty.</p>}
      {props.errorMessage && <p className={classes.invalidParagraph}>{props.errorMessage}</p>}
    </>
  );
};

export default Input;
