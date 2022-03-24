import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home.tsx";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
