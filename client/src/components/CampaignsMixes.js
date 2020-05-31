
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRomis, getMixes } from '../actions/index';
import { campaignsPick, digimixPick } from '../actions/index';

export class CampaignsMixes extends Component {

	constructor() {
		super();
	}

	componentDidMount() {
		this.props.getRomis();
		this.props.getMixes();
	}

	render() {	
		
		const { namePickedCampaign, idPickedCampaign, campaignsPick, setCurrentId, setCurrentMix } = this.props;

		return (
		<div className="row">
			<div className="col-5 offset-mt-1">
				<h4 className="pb-3 offset-mt-2">List of Campaigns</h4>			
			    <ul className="list-group list-group-flush">
				{this.props.campaigns.map (el => (

					<li onClick={setCurrentId(el.campaignName, el._id)} className="list-group-item" key={el._id}>
						{el.campaignName}
					</li>
				     
			))}		
			</ul>    
			</div>	

			<div className="col-4 offset-mt-2">
				<h4 className="pb-3 offset-mt-2">List of Digital Mixes</h4>
			<ul className="list-group list-group-flush">

				{this.props.mixes.map (mix => (
					<li onClick={setCurrentMix(mix.digiName, mix._id)} className="list-group-item" key={mix._id}>
						{mix.digiName}
					</li>
					     
				))}		
			</ul>    
			</div>	
		</div>
	);
	}	
}

function mapStateToProps(state) {
	return {
		campaigns: state.remoteCampaigns,
		mixes: state.remoteMixes
		};
}

/* Uses a function that takes in the dispatch function and returns an object with 
 a single function on it. The inner function will be the function called when a user 
 clicks on a character. The function simply creates an action using our ......switcheroo / 2nd
  action creator and then dispatches that action to the store. */

const mapDispatchToProps = (dispatch) => ({
// By default, a connected component receives props.dispatch and can dispatch actions itself.
// The below getMixes and getRomis can be transferred to the mapStateToProps	
// The Click action connects to the Store and updates the Value in the New Link Components

  getMixes: () => dispatch(getMixes()),	
  getRomis: () => dispatch(getRomis()),	
  setCurrentId(idPickedCampaign, namePickedCampaign){
  return () => 
  		{			
  			dispatch(campaignsPick(namePickedCampaign, idPickedCampaign));
  		};
  },
  setCurrentMix(idPickedMix, namePickedMix){
  return () => 
  		{			
  			dispatch(digimixPick(namePickedMix, idPickedMix));
  		};
  }
  
});

export default connect( mapStateToProps, mapDispatchToProps) (CampaignsMixes);