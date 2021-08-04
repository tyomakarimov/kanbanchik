import { FC } from 'react';

import Button from '../../components/Button/Button';
import classes from './Home.module.scss';

const Tasks: FC = () => {
  return (
    <div className={classes.home}>
      <Button flat={false}>Desks</Button>
      <Button flat={false}>Tasks</Button>
    </div>
  );
};

export default Tasks;
