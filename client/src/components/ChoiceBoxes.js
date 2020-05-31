
import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ChoiceBoxes extends Component {

	render() {	

		const { namePickedCampaign, idPickedCampaign, namePickedMix, idPickedMix } = this.props;

		return (
		
		<div className="quantity-modifier">
            <h5 className="m-2">You have chosen to link: </h5> 
             <li>{namePickedCampaign|| ".... Pick Any Campaign"} </li>
            <h5 className="m-2"> with Digital Mix: </h5> 
             <li> {namePickedMix || ".... Pick Any Digital Mix"} </li>
        </div>
		);
	}	
}

function mapStateToProps(state) {
	return {
		idPickedCampaign: state.idPickedCampaign,
		namePickedCampaign: state.namePickedCampaign,
		idPickedMix: state.idPickedMix,
		namePickedMix: state.namePickedMix
	};
}

// const mapDispatchToProps = (dispatch) => ({
//   switcheroo: (value) => dispatch(switcheroo(value)),
// });

export default connect(
	mapStateToProps, null
) (ChoiceBoxes);