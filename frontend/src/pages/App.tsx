import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../components/Navbar/Navbar';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Tasks from './Tasks/Tasks';
import { RootState } from '../store';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.authenticated);
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" exact>
            {!isAuthenticated && <Redirect to='/login' />}
            {isAuthenticated && <Redirect to='/tasks' />}
          </Route>
          <Route path="/login">
            {!isAuthenticated && <Login />}
            {isAuthenticated && <Redirect to='/tasks' />}
          </Route>
          <Route path="/register">
            {!isAuthenticated && <Register />}
            {isAuthenticated && <Redirect to='/tasks' />}
          </Route>
          <Route path="/tasks">
            {isAuthenticated && <Tasks />}
            {!isAuthenticated && <Redirect to='/login' />}
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
