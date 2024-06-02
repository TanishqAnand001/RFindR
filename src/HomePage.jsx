import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Assets/icon.png";
import "./App.css";

const HomePage = () => {
	return (
		<div className="home-page">
			<h1>Welcome to <span className="fancy">R</span>-Find-<span className="fancy">Я</span></h1>
			<p>Find restaurants, cafes, and bars near you!</p>

			<Link to="/map" className="button1">
				<img src={Logo} alt="Logo" className="image_link"/>
			</Link>
		</div>
	);
};

export default HomePage;
