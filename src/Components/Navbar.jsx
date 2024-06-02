import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

const Navbar = () => {
	return (
		<nav className="navbar">
			<h1 className="navbar-title"><span className="fancy">R</span>-Find-<span className="fancy">Я</span></h1>
			<div className="navbar-buttons">
				<Link to="/home" className="navbar-link">
					<button className="navbar-button">Home</button>
				</Link>
				<Link to="/about" className="navbar-link">
					<button className="navbar-button">About</button>
				</Link>
				<Link to="/map" className="navbar-link">
					<button className="navbar-button">Map</button>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
