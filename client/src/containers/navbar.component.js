import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{
	render() {
		return(
			<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
				<Link to="/" className="navbar-brand"> Markendo </Link>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
					<li className="navbar-item">
						<Link to="/create" className="nav-link"> Create ROMI </Link>
					</li>
					<li className="navbar-item">
						<Link to="/editromis" className="nav-link"> Edit ROMIs </Link>
					</li>
					<li className="navbar-item">
						<Link to="/searchromis" className="nav-link"> Search ROMIs </Link>
					</li>
					<li className="navbar-item">
						<Link to="/compare" className="nav-link"> Compare ROMIs </Link>
					</li>
					<li className="navbar-item">
						<Link to="/linkromimix" className="nav-link"> Link ROMI to Mix </Link>
					</li>
					<li className="navbar-item">
						<Link to="/digitalmarketingmix" className="nav-link"> Pick Digital Activities </Link>
					</li>
				</ul>
			</div>	
			</nav>
		)
	}
}