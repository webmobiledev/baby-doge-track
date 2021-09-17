import React, { useReducer } from 'react';
import { appReducer, initialState } from './app-reducer';
import TrackView from "./pages/TrackView";

export const AppContext = React.createContext({});

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <TrackView />
    </AppContext.Provider>
  );
}

export default App;
