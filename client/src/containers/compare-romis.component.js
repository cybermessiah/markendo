import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IndividualRomisCompare from "../components/individual-romis-compare.component";


export default class CompareRomis extends Component {

		constructor(props) {
		super(props);
		this.onChangeNetProfitParam = this.onChangeNetProfitParam.bind(this);
		this.onChangeCampaignCostParam = this.onChangeCampaignCostParam.bind(this);
	    this.onFormSubmit = this.onFormSubmit.bind(this);

		this.state = {
			romis: [],
			netProfitParam: '',
			campaignCostParam: '',
			gtNet: 0,	
		    ltNet: 0,
			gtCost: 0,	
		    ltCost: 0		    
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
	      gtNet: 1,
	      ltNet: 0  
	    })
    }

    onClickLtNet = (e) => {
    e.preventDefault();		    	
	    this.setState({
	      ltNet: 1,
	      gtNet: 0 

	    })
    }
	onClickGtCost = (e) => {
    e.preventDefault();				
	    this.setState({
	      gtCost: 1,
	      ltCost: 0  
	    })
    }

    onClickLtCost = (e) => {
    e.preventDefault();		    	
	    this.setState({
	      ltCost: 1,
	      gtCost: 0 

	    })
    }

	onFormSubmit(e){
		e.preventDefault();

		axios.get('http://localhost:5000/romis/compare',{
			 params: {
                netProfitParam: this.state.netProfitParam,
			    campaignCostParam: this.state.campaignCostParam,
		        gtNet: this.state.gtNet,
				ltNet: this.state.ltNet,
		        gtCost: this.state.gtCost,
				ltCost: this.state.ltCost             
             }
			})
      .then(res => {	
		console.log(res.data);
		this.setState({ romis: res.data, netProfitParam: '', campaignCostParam: ''});
	    })
      .catch((error) => {
		console.log(error);
		})

    }

	romisCompare(){	
			return (<IndividualRomisCompare romis={this.state.romis}/>); 
	};
	
	render() {
		let { netProfitParam, campaignCostParam, gtNet, ltNet, gtCost, ltCost } = this.state;
		return (
            <>

{/* Form For chosen Romis against criteria */}
            
            <div className="text-center">
				<p> You can put values to search through the Romis and compare them.
				The First Item will be used as a base </p>
			</div>
			<form onSubmit={ this.onFormSubmit }>
			    <div className="form-row">
			    <div className="form-group col-md-6 text-center">
			        <h6> Use one of the options below</h6>
			    	<button className="btn btn-outline-dark" onClick={this.onClickGtNet}>Greater Than</button>
			    	<button className="ml-2 btn btn-outline-dark" onClick={this.onClickLtNet}>Less Than</button>
				</div>			    
			    <div className="form-group col-md-6">
		    		<label htmlFor="netProfitParam">Net Profit</label>
					<input 
					  className="form-control"
					  type="text" 
					  value={this.state.netProfitParam}
					  onChange={this.onChangeNetProfitParam}
					  placeholder="Enter The Net Profit Range" 
					/>
				</div>
			    <div className="form-group col-md-6 text-center">
			        <h6> Use one of the options  below</h6>
			    	<button className="btn btn-outline-dark" onClick={this.onClickGtCost}>Greater Than</button>
			    	<button className="ml-2 btn btn-outline-dark" onClick={this.onClickLtCost}>Less Than</button>
				</div>				
			    <div className="form-group col-md-6">
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
				<div className="form-row" className="mt-4">
		        <button type="submit" className="mx-auto btn btn-outline-dark btn-block col-md-6">Submit</button>
				</div>
			</form>

{/*Show the compared ROMIS elements*/} 		

			<div className="mt-4">
				<h3 className= "mb-2"> COMPARE ROMIS </h3>
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
					  	{this.romisCompare()}
					    <tr>
					      <th scope="row">8</th>
					      <th>Period</th>
					      <td>TBD</td>
					    </tr>
					  </tbody>
					</table>
			</div>
			</>
		)
	}

}