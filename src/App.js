import "./App.css";
import { useContext, useState } from "react";
import { CategoriesContext } from "./context/CategoriesContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home.tsx";


function App() {
    const [random, setRandom]= useState({name: "Trendon"})
    return (
        <CategoriesContext.Provider value= {{ random, setRandom }}>
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </div>
        </CategoriesContext.Provider>
    );
}

export default App;
