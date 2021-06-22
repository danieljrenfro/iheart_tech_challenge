// Packages
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

// Components
import Header from '../Header/Header';

// Routes
import LandingPageRoute from '../../routes/LandingPageRoute/LandingPageRoute';
import SongsPageRoute from '../../routes/SongsPageRoute/SongsPageRoute';

// Styles
import './App.css';

library.add(faSortUp, faSortDown);

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
            path={'/songs'}
            component={SongsPageRoute}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
