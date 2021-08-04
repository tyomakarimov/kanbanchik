import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { logUserOut } from '../../store/Authentication/authActions';
import classes from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import userIcon from '../../assets/user.svg';

const Navbar: React.FC = () => {
  const userName = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.authenticated);
  const dispatch = useDispatch();
  const logOutHandler = () => dispatch(logUserOut());
  return (
    <header className={classes.header}>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          {!isAuthenticated && (
            <li>
              <NavLink to="/login" activeClassName={classes.active}>
                Login
              </NavLink>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <NavLink to="/register" activeClassName={classes.active}>
                Register
              </NavLink>
            </li>
          )}
          {isAuthenticated && (
            <>
              <img src={userIcon} alt="user" className={classes.userIcon} />
              <li>{userName}</li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
