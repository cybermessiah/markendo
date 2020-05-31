
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLinks } from '../actions/index';

export class ExistingLinks extends Component {

	constructor() {
		super();
		this.props = 0;
	}

	render() {	
		this.props.getLinks();
		const { links } = this.props;
		if (!links) {
	      return null;
	    }

	return (

		<>
		<div className="row mt-4">
			<div className="col-8 offset-mt-1">
				<h4 className="pb-3 offset-mt-2">Existing Links</h4>			
					<ul className="list-group list-group-flush">	
					{
						links.map((item) => 	
						      <span className="station" key={item._id}>
						      <b>{item.campaignName}</b>
						      &nbsp; is currently associated with &nbsp;	
						      <b>{item._digimix ? item._digimix.digiName : 'Nothing Picked' }</b>
        					  </span>	
						)
					}					
				</ul> 
			</div>	
		</div>
		</>
	);
	}	
}

function mapStateToProps(state) {
	return {
		links: state.remoteLinks
	};
}

export default connect( mapStateToProps, {getLinks}) (ExistingLinks);