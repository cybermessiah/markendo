import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from "../store/index";
// import { addArticle } from "../actions/index";
import ChoiceBoxes from "./ChoiceBoxes";
import CampaignsMixes from "./CampaignsMixes";
import NewLink from './NewLink.component';



export default class LinkRomiMix extends Component {

	render() {
		
		return (
			<div>
				<h3 className="pb-3 offset-mt-2"> LINK ROMI TO DIGITAL MARKETING MIX </h3>
				<p className="pb-3 offset-mt-2"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
				 ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				  laboris nisi ut aliquip ex ea commodo consequat. </p>	
				<div className="row mt-3">
					<div className="col-md-3 offset-mt-2">
						<h4 className="offset-mt-2 pb-3">Chosen Items</h4>
						<ChoiceBoxes />	
					</div>
					<div className="col-md-9 offset-mt-2">
						<CampaignsMixes />
					</div>
					<div className="col-md-4 offset-mt-1">
						<NewLink />							
					</div>
				</div>				
			</div>
		)
	}

}

