import classes from './Navbar.module.scss';
import logo from '../../assets/logo.svg';

const Navbar: React.FC = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt="Logo" />
      <nav>
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
