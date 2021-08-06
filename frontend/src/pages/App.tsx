import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../components/Navbar/Navbar';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Tasks from './Home/Home';
import { RootState } from '../store';
import { autoLogIn } from '../store/Authentication/authActions';

const App: React.FC = () => {
  console.log('here');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogIn());
  }, []);
  const isAuthenticated = useSelector((state: RootState) => state.auth.authenticated);
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" exact>
            {!isAuthenticated && <Redirect to="/login" />}
            {isAuthenticated && <Redirect to="/home" />}
          </Route>
          <Route path="/login">
            {!isAuthenticated && <Login />}
            {isAuthenticated && <Redirect to="/home" />}
          </Route>
          <Route path="/register">
            {!isAuthenticated && <Register />}
            {isAuthenticated && <Redirect to="/home" />}
          </Route>
          <Route path="/home">
            {isAuthenticated && <Tasks />}
            {!isAuthenticated && <Redirect to="/login" />}
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
