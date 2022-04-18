import './App.css';
import Trades from './components/trade';
import Positions from './components/positions';
import NavBar from './components/navBar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


function App() {
  return (
    // <div className="App">
      <BrowserRouter>
            <NavBar/>
        <Routes>
          <Route exact path="/trades" element={<Trades/>}/>
          <Route exact path="/positions" element={<Positions/>}/>
        </Routes>
      </BrowserRouter>
    // </div>
  );
}

export default App;
