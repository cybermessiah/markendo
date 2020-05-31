import React, { Component, useState } from 'react';
import SearchRomis from './search-romis';
import ReactDom from 'react-dom';
import axios from 'axios';

export default class SearchMain extends Component {

	constructor(props) {
    super(props);
   	this.state = {data: []};
  }

  componentDidMount() {
		axios.get('http://localhost:5000/romis')
			.then(response => {
				this.setState({ data: response.data });
			})
			.catch((error) => {
				console.log(error);	
			})	
	}
	
	render() {
				
		return (
		  	<>
			  <div>
				<SearchRomis  {...this.state}/>
			  </div>
		    </>  
      		);
	}

}

 