import React, { useState, useRef } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Tooltip,
	LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Autosuggest from "react-autosuggest"; // Import Autosuggest
import "../App.css";

// Fix for marker icons not showing up
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const SearchForm = ({ onSearch }) => {
	const [location, setLocation] = useState("");
	const [type, setType] = useState("restaurant");
	const [suggestions, setSuggestions] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(location, type);
	};

	const handleSuggestionsFetchRequested = async ({ value }) => {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&limit=75&q=${value}`
		);
		const data = await response.json();
		setSuggestions(data);
	};

	const handleSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const handleChange = (event, { newValue }) => {
		setLocation(newValue);
	};

	const getSuggestionValue = (suggestion) => suggestion.display_name;

	const renderSuggestion = (suggestion) => <div>{suggestion.display_name}</div>;

	const inputProps = {
		placeholder: "Enter location",
		value: location,
		onChange: handleChange,
	};

	return (
		<form onSubmit={handleSubmit} className="search-form">
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
				onSuggestionsClearRequested={handleSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
			/>
			<select
				value={type}
				onChange={(e) => setType(e.target.value)}
				className="select"
			>
				<option value="restaurant">Restaurant</option>
				<option value="cafe">Cafe</option>
				<option value="bar">Bar</option>
			</select>
			<button type="submit" className="button">
				Search
			</button>
		</form>
	);
};

const PlaceList = ({ places, onPlaceClick, onPlaceHover }) => {
	return (
		<div className="place-list">
			{places.map((place, index) => (
				<button
					key={index}
					className="place-item"
					onClick={() => onPlaceClick(place)}
					onMouseEnter={() => onPlaceHover(place)}
				>
					{place.display_name}
				</button>
			))}
		</div>
	);
};

const MapPage = () => {
	const [markers, setMarkers] = useState([]);
	const [selectedPlace, setSelectedPlace] = useState(null);
	const mapRef = useRef(null); // Ref to store the map instance

	const handleSearch = async (location, type) => {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&limit=75&q=${type} in ${location}`
		);
		const data = await response.json();

		const newMarkers = data.map((result) => ({
			lat: result.lat,
			lon: result.lon,
			display_name: result.display_name,
		}));

		setMarkers(newMarkers);

		if (newMarkers.length > 0 && mapRef.current) {
			const { lat, lon } = newMarkers[0];
			mapRef.current.setView([lat, lon], 13); // Set the map view to the first marker's location
		}
	};

	const handlePlaceClick = (place) => {
		setSelectedPlace(place);
		if (mapRef.current) {
			mapRef.current.setView([place.lat, place.lon], 13);
		}
	};

	const handlePlaceHover = (place) => {
		if (mapRef.current) {
			mapRef.current.setView([place.lat, place.lon], 25);
		}
		mapRef.current.setView([place.lat, place.lon], 13);
	};

	return (
		<div className="map-container">
			<div className="sidebar">
				<h2 className="found">Places Found</h2>
				<SearchForm onSearch={handleSearch} />
				<PlaceList
					places={markers}
					onPlaceClick={handlePlaceClick}
					onPlaceHover={handlePlaceHover}
				/>
			</div>
			<MapContainer center={[0, 0]} zoom={13} className="map" ref={mapRef}>
				<LayersControl position="topright">
					<LayersControl.BaseLayer checked name="Street">
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&
							copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Satellite">
						<TileLayer
							url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
							attribution="&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
						/>
					</LayersControl.BaseLayer>
				</LayersControl>
				{markers.map((marker, index) => (
					<Marker key={index} position={[marker.lat, marker.lon]}>
						<Popup>{marker.display_name}</Popup>
						<Tooltip>{marker.display_name}</Tooltip>
					</Marker>
				))}
				{selectedPlace !== null && (
					<Marker position={[selectedPlace.lat, selectedPlace.lon]} riseOnHover>
						<Popup>{selectedPlace.display_name}</Popup>
						<Tooltip>{selectedPlace.display_name}</Tooltip>
					</Marker>
				)}
			</MapContainer>
		</div>
	);
};

export default MapPage;
