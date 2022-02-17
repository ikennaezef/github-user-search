import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import Home from './pages/Home';
import User from './pages/User';


export const AppContext = createContext(null);


function App() {

  const [user, setUser] = useState(null);

  return (
    <HashRouter basename="/" >
      <AppContext.Provider value={{ user, setUser }} >
        <div className="App">
          <Routes>
            <Route exact path='/' element={  <Home/>  } />
            <Route exact path='/user' element={  <User/>  } />
          </Routes>
        </div>        
      </AppContext.Provider>
    </HashRouter>
  );
}

export default App;
