import React from 'react';
import EmailHome from './components/EmailHome';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <EmailHome />
        {/* <Routes>
          <Route path='/' exact />
        </Routes> */}
      </Router>
    </>
  );
}

export default App;
