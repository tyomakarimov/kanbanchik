import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.scss';
import logo from '../../assets/logo.svg';

const Navbar: React.FC = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          <li>
            <NavLink to="/login" activeClassName={classes.active}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" activeClassName={classes.active}>
              Register
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
