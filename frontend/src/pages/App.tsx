import { Switch, Route } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import Login from './Authentication/Login';
import Register from './Authentication/Register';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
