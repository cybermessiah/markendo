import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class IndividualRomisCompare extends Component{

	constructor(props) {
		super(props);
	}

render() {
    const data = this.props.romis;
// Create an Array of the Object with Keys. Note on 0 campaign Costs. Blobs a message    
    const CompareRomis = [];
		data.forEach(function (comparison) {
		if (comparison.campaignCost==0){
		 CompareRomis.push(0);
		 console.log("No Campaign");
		}
		else {	
		  CompareRomis.push((((comparison.profitNet-comparison.campaignCost)/comparison.campaignCost)
		  	*100).toFixed(0));
		  console.log("ROMI");
		}  
	});
// Get the Base value case
	const basecase = CompareRomis[0];
// Create an Array with Calculated Net Profits off the first Base. Offset the first Value
    const CalculatedRomis = [];

for (let i = 0; i < CompareRomis.length; i++) {
  
		if (i!=0){
		  if(CompareRomis[i]!==0){
		  CalculatedRomis.push(CompareRomis[i] - basecase);
		  }
		  else {
		  CalculatedRomis.push("No Campaign");
          }
		} 
		else { CalculatedRomis.push(CompareRomis[i]);}
    }

    const CampaignNameItems = data.map((d) =>
    	<CampaignName key={d.campaignName} singleitem = {d} />
   		);
	const UnitSalesItems = data.map((d) =>
    	<UnitSales key= {d.campaignName} singleitem = {d} />	
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
	const ComparedRomis = CalculatedRomis.map((item,i) => {
		if (i!=0){
		return <td key={i}>{item}</td>;
		}
		return <td> BASE CASE: {item}</td>;

	});	
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
					    <tr className="wh-bg">
					      <th scope="row">7</th>
					      <th>ROMI *
					      (Comparison)
					      </th>
					      {ComparedRomis}
					    </tr>
					</>    	
    
    );
  }

}

const CampaignName = (props) => 
						<td>{props.singleitem.campaignName}</td>
const UnitSales = (props) => 
						<td>{props.singleitem.unitSales}</td>; 
const Margin = (props) => 
						<td>{props.singleitem.margin}</td>; 
const CampaignCost = (props) => 
						<td>{props.singleitem.campaignCost}</td>; 
const GrossProfit = (props) => 
						<td>{props.singleitem.profitGross}</td>; 
const NetProfit = (props) => 
						<td>{props.singleitem.profitNet}</td>; 
