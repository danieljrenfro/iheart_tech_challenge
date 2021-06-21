// Packages
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Header from '../Header/Header';

// Routes
import LandingPageRoute from '../../routes/LandingPageRoute/LandingPageRoute';
import SongsPageRoute from '../../routes/SongsPageRoute/SongsPageRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path={'/'}
            component={LandingPageRoute}
          />
          <Route 
            exact
            path={'/songs'}
            component={SongsPageRoute}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
