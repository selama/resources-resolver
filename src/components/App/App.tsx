import React from 'react';
import { loadSWFilmsListResource } from '../sw-films/sw-films-list';

interface AppProps {}

const SWFilmsList = loadSWFilmsListResource().getComponent();

class App extends React.Component<AppProps> {
  render() {
    return <SWFilmsList />;
  }
}

export default App;
