import React, { Component } from 'react';
import '../DigitalMarketing.css';
import axios from 'axios';

export default class DigitalMarketingActivities extends Component {
	state = {

		// digitalmarketing mix deals with the drag and drop options
		// formControls is responsible for the corresponding values(cost) to the chosen DM activities
		// digiName is the general name given to the campaign/launch

		digitalmarketingmix: [
		{name: "SEO", category: "mixtopick", bgcolor:""},
		{name: "New Website", category: "mixtopick", bgcolor:"black"},
		{name: "Facebook Ads", category: "chosen", bgcolor:"grey"},
		{name: "Email Marketing", category: "chosen", bgcolor:"green"},
		{name: "Affiliate", category: "mixtopick", bgcolor:""},
		{name: "Google Adsense", category: "mixtopick", bgcolor:"black"},
		{name: "Online Surveys", category: "chosen", bgcolor:"grey"}
		],
		formControls: {}
        ,
        digiName:''
	}
	
	changeName = event => {
		const name = event.target.value;
	    this.setState({
	      digiName: name 
	    });
  }

	changeHandler = event => {
      
      const name = event.target.name;
      const value = event.target.value;

		this.setState(prevState => ({
		  formControls: {
		    ...prevState.formControls,
		   [name]:value
		  }
		}));  

     } 

  	formSubmitHandler = async e => {
  		e.preventDefault();
  		var result = Object.keys(this.state.formControls).map(chosen => ({ chosen, cost: this.state.formControls[chosen] }));	

  		const res = await axios.post('http://localhost:5000/digimix/add',{
  			digiName: this.state.digiName,
  			chosenActivities: result,
  		})
  		console.log(res);	
  		console.log(result);
    // console.dir(this.state.formControls);
    
    }

	onDragStart = (ev, id) => {
		console.log('dragstart:', id);
		ev.dataTransfer.setData("id", id);		
	}
	onDragOver = (ev) => {
		ev.preventDefault();
	}
	onDrop = (ev, cat) => {
		let id = ev.dataTransfer.getData("id");
		let digitalmarketingmix = this.state.digitalmarketingmix.filter((activity)=> {
			if(activity.name === id) {
				activity.category = cat;
			}
			return activity;
		});

		this.setState({
		...this.state,
		digitalmarketingmix
	    });
	} 
	
	render() {
		var mix = {
			mixtopick: [],
			chosen: []
		}
		this.state.digitalmarketingmix.forEach((t) => {
			if(t.category=="mixtopick")
			mix["mixtopick"].push(
				<div key={t.name}
					 onDragStart = {(e)=> this.onDragStart(e, t.name)}
					 draggable
					 className="mt-3 btn btn-outline-light draggable"
					 style={{backgroundColor: t.bgcolor}}
					 >
					 {t.name}
				</div>
				);
		});

		this.state.digitalmarketingmix.forEach((t) => {
			if(t.category=="chosen")
			mix["chosen"].push(
				<li className="list-unstyled my-3"><div key={t.name}
					 onDragStart = {(e)=> this.onDragStart(e, t.name)}
					 draggable
					 className="btn btn-outline-light draggable"
					 style={{backgroundColor: t.bgcolor}}
					 >
					 {t.name}
				</div>

					{/* The form inputs related to the individual activity values, key pairs */}

				<input type="text" 
		                     name={t.name}  
		                     value={t.name.value}
		                     onChange={this.changeHandler}
		                     className="ml-2" 
		        />
				</li>
				);
		});

		return (
			<div className="container container-drag">
				<h2 className="header">PICK MARKETING ACTIVITIES</h2>
				<div className="row">
				<div className="col-4 mixtopick"
				     onDragOver={(e)=> this.onDragOver(e)}
					 onDrop={(e)=> this.onDrop(e, "mixtopick")}>
					 <span className="mix-header"> PICK ACTIVITY </span>
					{ mix.mixtopick }
					<p className="mt-4 text-white">Drag any of the Activities to the right area,
                     by holding it for 1 sec and then move. If you change your mind
					just drag them back here.</p>
				</div>
				<div className="col-8 right-chosen">
				<form>

					{/* Form input for the individual campaign/launch name */}

					<label className="p-3">
					Name your campaign:
					<input 		 type="text" 
								 name="digiName"  
								 value={this.state.digiName}
								 onChange={this.changeName}	
								 className="m-2"	        
					/>
					</label>
					<ul className="col-12 droppable w-100 pb-3" 
						 onDragOver={(e)=> this.onDragOver(e)}
						 onDrop={(e)=> this.onDrop(e, "chosen")}>
						 <span className="mix-header"> CHOSEN ACTIVITIES</span>				
						{ mix.chosen }
					<button className="btn btn-outline-dark btn-lg" onClick={this.formSubmitHandler}> Submit </button>	
					</ul>   
				</form> 
				</div>
		        </div>      
			</div>
		);
	}

}