// AboutPage.jsx
import React from "react";
import "./AboutPage.css"; // Import CSS for AboutPage styling

const AboutPage = () => {
	return (
		<div className="about-page">
			<h2>About Restaurant Finder</h2>
			<p>
				Restaurant Finder is a web application that allows users to search for
				restaurants, cafes, and bars based on their location. It utilizes the
				OpenStreetMap API to fetch location data and displays it on an
				interactive map.
			</p>
			<p>
				Our mission is to provide users with a convenient way to discover dining
				options nearby, whether they are looking for a cozy cafe, a trendy bar,
				or a fine dining restaurant.
			</p>
			<h3>Key Features</h3>
			<ul>
				<li>Search for restaurants, cafes, and bars by location</li>
				<li>Interactive map for visualizing search results</li>
				<li>Filter search results by type of establishment</li>
				<li>View detailed information about each place</li>
				<li>Responsive design for seamless user experience on all devices</li>
			</ul>
			<h3>Our Team</h3>
			<p>
				Restaurant Finder is developed by a team of passionate developers
				dedicated to creating innovative web applications. Meet our team:
			</p>
			<ul>
				<li>Tanishq Anand - Full Stack Developer</li>
				<li>Tanishq Anand - UI/UX Designer</li>
				<li>Tanishq Anand - Backend Developer</li>
				<li>Tanishq Anand - Frontend Developer</li>
			</ul>
			<h3>Contact Us</h3>
			<p>
				We'd love to hear from you! If you have any questions, feedback, or
				suggestions, please feel free to contact us at
				info@rfindr.com.
			</p>
		</div>
	);
};

export default AboutPage;
