import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Romi from "../components/romi.component";

export default class ListRomis extends Component {

	romisList(){	
			return (<Romi/>); 
	}
	render() {
		return (
			<div>

				<h3> ALL ROMIS </h3>
					<table className="table table-striped table-dark">
					  <thead>
					    <tr>
					      <th scope="col">#</th>
					      <th scope="col"></th>
					      <th scope="col"></th>
					      <th scope="col"></th>
					    </tr>
					  </thead>
					  <tbody>
					  	{this.romisList()}

					    <tr>
					      <th scope="row">8</th>
					      <th>Period</th>
					      <td>TBD</td>
					    </tr>
					  </tbody>
					</table>
			</div>
		)
	}

}