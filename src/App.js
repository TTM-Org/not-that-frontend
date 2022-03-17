import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// Pages
import Home from './Pages/Home'


function App() {
  return (
    <div className="flex justify-center">
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
    </div>
  );
}

export default App;
