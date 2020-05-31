import React, { Component, useState } from 'react';
import ReactDom from 'react-dom';

function SearchRomis({data}){

	const [searchTerm, setSearchTerm] = React.useState("");
	const [searchResults, setSearchResults] = React.useState([]);	
	const handleChange = event => {
		setSearchTerm(event.target.value);
	};
	React.useEffect(() => {
		var results = data.map(item => item.campaignName)
		.filter(person =>
			person.toLowerCase().includes(searchTerm)
		);
		setSearchResults(results);
		},[searchResults]);
		
	return (
		<div className="search-romis">
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={handleChange}
			/>
			<ul>
			{searchResults.map(item => (
				<li>{item}</li>))}
			</ul>
		</div>
	);
}

export default SearchRomis;

