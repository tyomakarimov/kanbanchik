import { Switch, Route } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import Login from '../pages/Login/Login';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
