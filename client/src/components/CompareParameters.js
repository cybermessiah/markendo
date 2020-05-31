import React, { Component } from 'react';
import axios from 'axios';

export default class CompareParameters extends Component {

	constructor(props) {
		super(props);

		// this.onChangeMargin = this.onChangeMargin.bind(this);
		this.onChangeNetProfitParam = this.onChangeNetProfitParam.bind(this);
		this.onChangeCampaignCostParam = this.onChangeCampaignCostParam.bind(this);
	    this.onFormSubmit = this.onFormSubmit.bind(this);

		this.state = {
			netProfitParam: '',
			campaignCostParam: '',
			gtNet: false,	
		    ltNet: false,
			gtCost: false,	
		    ltCost: false,		    
			// campaignCost: ''
		};
	}

	onChangeNetProfitParam(e){
			this.setState({
				netProfitParam: e.target.value
			});
	}

	onChangeCampaignCostParam(e){
			this.setState({
				campaignCostParam: e.target.value
			});
	}

	onClickGtNet = (e) => {
    e.preventDefault();		
	    this.setState({
	      gtNet: true,
	      ltNet: false  
	    })
    }

    onClickLtNet = (e) => {
    e.preventDefault();		    	
	    this.setState({
	      ltNet: true,
	      gtNet: false 

	    })
    }
	onClickGtCost = (e) => {
    e.preventDefault();				
	    this.setState({
	      gtCost: true,
	      ltCost: false  
	    })
    }

    onClickLtCost = (e) => {
    e.preventDefault();		    	
	    this.setState({
	      ltCost: true,
	      gtCost: false 

	    })
    }

	onFormSubmit(e){
		e.preventDefault();
		const compareparams = {
			netProfitParam: this.state.netProfitParam,
			campaignCostParam: this.state.campaignCostParam,
	        gtNet: this.state.gtNet,
			ltNet: this.state.ltNet,
	        gtCost: this.state.gtCost,
			ltCost: this.state.ltCost			
		};
		axios.post('http://localhost:5000/romis/add', compareparams)
      .then(res => console.log(res.data));	
		console.log(compareparams);
		this.setState({ netProfitParam: '', campaignCostParam: ''});
	}
	
	render() {

		let { netProfitParam, campaignCostParam, gtNet, ltNet, gtCost, ltCost } = this.state;
		
		return (
			<>
			<div>
				<p> You can put values to search through the Romis and compare </p>
				<p> The First Item will be used as a base </p>
			</div>
			<form onSubmit={ this.onFormSubmit }>
			    <div className="form-row">
			    <div className="form-group col-md-3">
			        <label > Use one of the options  below</label>
			    	<button onClick={this.onClickGtNet}>Greater Than</button>
			    	<button onClick={this.onClickLtNet}>Less Than</button>
				</div>			    
			    <div className="form-group col-md-3">
		    		<label htmlFor="netProfitParam">Net Profit</label>
					<input 
					  className="form-control"
					  type="text" 
					  value={this.state.netProfitParam}
					  onChange={this.onChangeNetProfitParam}
					  placeholder="Enter The Net Profit Range" 
					/>
				</div>
			    <div className="form-group col-md-3">
			        <label > Use one of the options  below</label>
			    	<button onClick={this.onClickGtCost}>Greater Than</button>
			    	<button onClick={this.onClickLtCost}>Less Than</button>
				</div>				
			    <div className="form-group col-md-3">
				    <label htmlFor="campaignCostParam">Campaign Cost</label>
					<input 
					  className="form-control"
					  type="number" 
					  value={this.state.campaignCostParam}
					  onChange={this.onChangeCampaignCostParam}
					  placeholder="Enter Campaign Cost Params" 
					/>
				</div>

				</div>
				<div className="form-row">
		        <button type="submit" className="btn btn-primary btn-block col-md-6">Submit</button>
				</div>
			</form>
			</>
		);
	}

}