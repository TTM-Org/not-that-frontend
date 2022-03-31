import "./App.css";
import { useState, useReducer } from "react";
import { CategoriesContext } from "./context/CategoriesContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home.tsx";

// Reducer
function reducer(state, action) {
    console.log("state: ",state, "action: ", action)
    switch (action.type) {
        case 'setZip':
            return {zipcode: action.payload.code};
        case 'setBusinesses':
            return {businesses: action.payload.businesses} 
        default:
            throw new Error();
    }
  }


function App() {
    let initialState = {zipcode: 0}

    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <CategoriesContext.Provider value= {{ state, dispatch }}>
            <div className="App">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </div>
        </CategoriesContext.Provider>
    );
}

export default App;
