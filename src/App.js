import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import MapPage from "./Components/Map";
import Navbar from "./Components/Navbar";
import AboutPage from "./AboutPage";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
						<Routes>
							<Route exact path="/home" element={<HomePage />} />
							<Route path="/map" element={<MapPage />} />
							<Route path="/about" element={<AboutPage />} />
						</Routes> 
			</div>
		</Router>
	);
}

export default App;
