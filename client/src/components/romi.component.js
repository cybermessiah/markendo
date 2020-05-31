import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class Romi extends Component{

	constructor(props) {
		super(props);

		this.state = {romis: []};
	}

	componentDidMount() {
		axios.get('http://localhost:5000/romis')
			.then(response => {
				this.setState({ romis: response.data });
			})
			.catch((error) => {
				console.log(error);
			})
	}

render() {
    const data = this.state.romis;
    // Create an Array of the Object with Keys to calculate the ROMIS    
    const CompareRomis = [];
		data.forEach(function (comparison) {
		if (comparison.campaignCost==0){
		 CompareRomis.push("No Campaign");
		}
		else {	
		  CompareRomis.push((((comparison.profitNet-comparison.campaignCost)/comparison.campaignCost)
		  	*100).toFixed(0));
		  console.log("ROMI");
		}  
	});

    const CampaignNameItems = data.map((d) =>
    	<td key={d.campaignName}> {d.campaignName} </td>
   		);
    const UnitSalesItems = data.map((d) =>
    	<UnitSales key={d.campaignName} singleitem = {d} />	
   		);
    const MarginItems = data.map((d) =>
    	<Margin key={d.campaignName} singleitem = {d} />	
   		);
    const CampaignCostItems = data.map((d) =>
    	<CampaignCost key={d.campaignName} singleitem = {d} />	
   		);
    const GrossProfitItems = data.map((d) =>
    	<GrossProfit key={d.campaignName} singleitem = {d} />	
   		);
	const NetProfitItems = data.map((d) =>
    	<NetProfit key={d.campaignName} singleitem = {d} />	
   		);
	const ListRomis = CompareRomis.map((item,i) =>
		<td key={i}>{item}</td>
	);	

    return (
    				<>
      					<tr>
					      <th scope="row">1</th>
					      <th>Campaign Name</th>
					      	{CampaignNameItems}
					    </tr>
					    <tr>
					      <th scope="row">2</th>
					      <th>Unit Sales</th>
						  	{UnitSalesItems}
					    </tr>
					    <tr>
					      <th scope="row">3</th>
					      <th>Margin</th>
					      	{MarginItems}
					    </tr>
					    <tr>
					      <th scope="row">4</th>
					      <th>Campaign Cost</th>
					      	{CampaignCostItems}
					    </tr>
					    <tr>
					      <th scope="row">5</th>
					      <th>Gross Profit</th>
					      	{GrossProfitItems}
					    </tr>
					    <tr>
					      <th scope="row">5</th>
					      <th>Net Profit</th>
					      	{NetProfitItems}
					    </tr>
					    <tr>
					      <th scope="row">6</th>
					      <th>Extra</th>
					      <td>TBD</td>
					    </tr>
					    <tr>
					      <th scope="row">7</th>
					      <th>ROMI</th>
						  {ListRomis}					    
	  					</tr>					    
					</>    	
    
    );
  }

}

const CampaignName = (props) => 
					    <td>{props.singleitem.campaignName}</td>;
const UnitSales = (props) => 
						<td>{props.singleitem.unitSales}</td>; 
const Margin = (props) => 
						<td>{props.singleitem.margin}</td>; 
const CampaignCost = (props) => 
						<td>{props.singleitem.campaignCost}</td>; 
const GrossProfit = (props) => 
						<td>{props.singleitem.profitGross}</td>; 
const NetProfit = (props) => 
						<td> {props.singleitem.profitNet}</td>; 