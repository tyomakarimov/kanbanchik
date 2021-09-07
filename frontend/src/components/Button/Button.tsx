import { FC } from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.scss';

interface Props {
  flat: boolean;
  link?: string;
}

const Button: FC<Props> = props => {
  const classNames = [classes.button, props.flat ? classes.flat : ''];
  if (props.link) {
    return (
      <Link to={props.link}>
        <button className={classNames.join(' ')}>{props.children}</button>
      </Link>
    );
  }
  return <button className={classNames.join(' ')}>{props.children}</button>;
};

export default Button;
