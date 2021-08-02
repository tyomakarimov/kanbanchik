import { useState, RefObject } from 'react';
import classes from './Input.module.scss';

interface Props {
  id: string;
  type: string;
  label: string;
  reference: RefObject<HTMLInputElement>;
  onLoosingFocus?: () => Promise<boolean | undefined>;
}

const Input: React.FC<Props> = props => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const classNames = [classes.formInput, isEmpty || !isValid ? classes.invalidInput : ''];

  const blurHandler = async () => {
    if (!isTouched) setIsTouched(true);
    if (!props.reference.current?.value) setIsEmpty(true);
    else setIsEmpty(false);
    if (props.onLoosingFocus) (await props.onLoosingFocus()) ? setIsValid(true) : setIsValid(false);
  };

  const changeHandler = () => {
    if (!isTouched) return;
    if (!props.reference.current?.value) setIsEmpty(true);
    else setIsEmpty(false);
  };

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
      />
      {isEmpty && <p className={classes.invalidParagraph}>This field cannot be empty.</p>}
    </>
  );
};

export default Input;
