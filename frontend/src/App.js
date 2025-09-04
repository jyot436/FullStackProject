import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddSchool from "./Components/AddSchool";
import ShowSchools from "./Components/ShowSchools";
import "./App.css";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="navbar">
  <NavLink to="/add" activeClassName="active">
    Add School
  </NavLink>
  <NavLink to="/schools" activeClassName="active">
    Show Schools
  </NavLink>
</div>


      <Routes>
        <Route path="/add" element={<AddSchool />} />
        <Route path="/schools" element={<ShowSchools />} />
      </Routes>
    </Router>
  );
}

export default App;
