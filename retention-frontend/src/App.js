import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import ModelPage from "./components/ModelPage";
import "./App.css";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/model" element={<ModelPage/>} />
          {/* <Navigate replace to="/" /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
