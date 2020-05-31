import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

export default class CreateRomi extends Component {

	constructor(props) {
		super(props);

		this.onChangeCampaignName = this.onChangeCampaignName.bind(this);
		this.onChangeUnitSales = this.onChangeUnitSales.bind(this);
		this.onChangeMargin = this.onChangeMargin.bind(this);
		this.onChangeProfit = this.onChangeProfit.bind(this);
		this.onChangeCampaignCost = this.onChangeCampaignCost.bind(this);
		this.handleStartDate = this.handleStartDate.bind(this);
		this.handleEndDate = this.handleEndDate.bind(this);
	    this.onFormSubmit = this.onFormSubmit.bind(this);

// Fix for moment inclusion. Doesnt work if combined?
		this.state = {
		  startDate: moment(),
		  endDate: moment()
		};

		this.state = {
			campaignName: '',
			unitSales: '',
			margin: '',
			profit: '',
			campaignCost: ''
		};
	}
	
	handleStartDate(d){
	    this.setState({
	      startDate: d
	    });
	};
	handleEndDate(d){
	    this.setState({
	      endDate: d
	    });
	};
	onChangeCampaignName(e){
			this.setState({
				campaignName: e.target.value
			});
	}

	onChangeUnitSales(e){
			this.setState({
				unitSales: e.target.value
			});
	}


	onChangeMargin(e){
			this.setState({
				margin: e.target.value
			});
	}


	onChangeProfit(e){
			this.setState({
				profit: e.target.value
			});
	}

	onChangeCampaignCost(e){
			this.setState({
				campaignCost: e.target.value
			});
	}
	
	onFormSubmit(e){
		e.preventDefault();
		const romi = {
			campaignName: this.state.campaignName,
			unitSales: this.state.unitSales,
			margin: this.state.margin,
			campaignCost: this.state.campaignCost,
			startDate: this.state.startDate,
			endDate: this.state.endDate
		};
		axios.post('http://localhost:5000/romis/add', romi)
      .then(res => console.log(res.data));	
		console.log(romi);
		this.setState({ campaignName: '', unitSales: '', margin: '', campaignCost: ''});

	}
	
	render() {
		
		return (
			<>
			<div>
				<p> Here you can create a brand new ROMI </p>
			</div>
			<form onSubmit={ this.onFormSubmit }>
			    <div className="form-row">
			    <div className="form-group col-md-3">
		    		<label htmlFor="campaingName">Campaign Name</label>
					<input 
					  className="form-control"
					  type="text" 
					  value={this.state.campaignName}
					  onChange={this.onChangeCampaignName}
					  placeholder="Enter Campaign Name" 
					  required 
					/>
				</div>
			    <div className="form-group col-md-3">
				    <label htmlFor="unitSales">Unit Sales</label>
					<input 
					  className="form-control"
					  type="number" 
					  value={this.state.unitSales}
					  onChange={this.onChangeUnitSales}
					  placeholder="Enter Unit Sales" 
					  required 
					/>
				</div>
				<div className="form-group col-md-3">
		    	<label htmlFor="campaignCost">Margin</label>
					<input 
					  className="form-control"
					  type="number" 
					  value={this.state.margin}
					  onChange={this.onChangeMargin}
					  placeholder="Enter Margin" 
					  required 
					/>
				</div>
				</div>
				<div className="form-row">
				<div className="form-group col-md-3">
		    	<label htmlFor="campaignCost">Campaign Cost (if any)</label>
					<input 
					  className="form-control"
					  type="number" 
					  value={this.state.campaignCost}
					  onChange={this.onChangeCampaignCost}
					  placeholder="Campaign Cost" 
					/>
				</div>
				<div className="form-group col-md-6">
				<label htmlFor="">Pick Start and End Date</label><br/>
				<DatePicker
				  className="form-control"
				  selected={this.state.startDate}
				  onChange={this.handleStartDate}
				  showMonthYearPicker
				  selectsStart
				  startDate={this.state.startDate}
        		  endDate={this.state.endDate}
				/>
				<DatePicker
				  className="form-control"
				  selected={this.state.endDate}
				  onChange={this.handleEndDate}
				  showMonthYearPicker
				  selectsEnd
				  startDate={this.state.startDate}
        		  endDate={this.state.endDate}
        		  minDate={this.state.startDate}
				/>
				</div>
				</div>
				<div className="form-row">
		        <button type="submit" className="mt-4 btn btn-outline-dark btn-block col-md-6">Submit</button>
				</div>
			</form>
			</>
		);
	}

}