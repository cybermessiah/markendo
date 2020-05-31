import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from "../store/index";
import ChoiceBoxes from "../components/ChoiceBoxes";
import CampaignsMixes from "../components/CampaignsMixes";
import NewLink from '../components/NewLink.component';
import ExistingLinks from '../components/ExistingLinks.component';



export default class LinkRomiMix extends Component {

	render() {
		
		return (
			<div>
				<h3 className="pb-3 offset-mt-2"> LINK ROMI TO DIGITAL MARKETING MIX </h3>
				<p className="pb-3 offset-mt-2"> Here you can link any Campaign Mix to the corresponding
				Digital Mixes Element. Click on top of the Lists and the name will appear to your left. </p>	
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
					<div className="col-md-8 offset-mt-1">
						<ExistingLinks />							
					</div>
				</div>				
			</div>
		)
	}

}

