import React, { Component } from 'react';
// import Form from 'bootstrap/Form'
// import Button from 'bootstrap/Button';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
import axios from 'axios';

export default class EditRomis extends Component {
	constructor(props) {
	    super(props);
		this.onChangeProfit = this.onChangeProfit.bind(this);
		this.handleStartDate = this.handleStartDate.bind(this);
		this.handleEndDate = this.handleEndDate.bind(this);
	    // this.onFormSubmit = this.onFormSubmit.bind(this);
	    this.toggleBox = this.toggleBox.bind(this);


// Fix for moment inclusion. Doesnt work if combined?
/*		this.state = {
		  startDate: moment(),
		  endDate: moment()
		};*/
        this.state = {
        	campaigns: [],
        	opened: false,
        	refid:''
        };
/*		this.state = {
			campaignName: '',
			unitSales: '',
			margin: '',
			profit: '',
			campaignCost: ''
		};*/
    }
    componentDidMount() {
    	axios.get('http://localhost:5000/romis/campaigns')
    		// this.props.match.params.id)
	      .then(res => {
	        this.setState({
	          campaigns: res.data         
	        });
	      })
	      .catch((error) => {
	        console.log(error);
        })
    }	

    toggleBox(refid) {
		const { opened } = this.state;
		this.setState({
			opened: true,
			refid:refid
		});

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

	onChangeProfit(e){
				this.setState({
					profit: e.target.value
				});
	}

	render() {
		var title  = '';
		const { opened,refid } = this.state;
        
			return (
			<div className = "row">	
			    <div className="col-4">
            	<ul className="list-group list-group-flush">
					{this.state.campaigns.map (el => (

						<li className="list-group-item" key={el._id} onClick={()=>this.toggleBox(el._id)}>
							{el.campaignName}
						</li>
					     
					))}		
			    </ul>
			    </div> 
                
                <div className="col-8">
                	{<IndividualROMI romiid = {this.state.refid}/>||'Click on any of the items to Edit it'}
				</div>	
			</div>
			);
	}
}

class IndividualROMI extends Component {
	constructor(props) {
	    super(props);
	    this.onChangeCampaignName = this.onChangeCampaignName.bind(this);
		this.onChangeUnitSales = this.onChangeUnitSales.bind(this);
		this.onChangeMargin = this.onChangeMargin.bind(this);
		this.onChangeCampaignCost = this.onChangeCampaignCost.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    		this.state = {	
    		romiid: '',	
			campaignName: '',
			unitSales: '',
			margin: '',
			profit: '',
			campaignCost: ''
		};
	}	
/*Note on the Child Component. It doesn't re-render when the Parent Prop changes.
In order to overcome that prevProps and check are introduced.*/	
	componentDidUpdate(prevProps) {
		if(prevProps.romiid !== this.props.romiid) {
    	axios.get('http://localhost:5000/romis/edit-romi/' + this.props.romiid)
	      .then(res => {
	        this.setState({	
	          campaignName: res.data.campaignName,
	          unitSales: res.data.unitSales,
	          margin: res.data.margin,
	          profit: res.data.profit,
	          campaignCost: res.data.campaignCost          
	        });
	      })
	      .catch((error) => {
	        console.log(error);
        });
    	}
	}

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
	onChangeCampaignCost(e){
				this.setState({
					campaignCost: e.target.value
				});
	}

    onSubmit(e) {
	    e.preventDefault()

	    const romiObject = {
	      campaignName: this.state.campaignName,
	      unitSales: this.state.unitSales,
	      margin: this.state.margin,
	      campaignCost: this.state.campaignCost	      
	    };

	    axios.put('http://localhost:5000/romis/update-romi/' + this.props.romiid, romiObject)
	      .then((res) => {
	        console.log(res.data)
	        console.log('ROMI successfully updated')
	      }).catch((error) => {
	        console.log(error)
	      })

    }

	render() {

		const { romiid, campaignName, unitSales, margin, campaignCost } = this.state;
		return (
		<form onSubmit={this.onSubmit}>
		  <div className="form-row">

		  <div className="form-group col-md-6">
		    <label htmlFor="campaingName">Campaign Name</label>
		    <input type="text" value={this.state.campaignName}  className="form-control" 
		    onChange={this.onChangeCampaignName} id="campaingName" 
		    placeholder="Edit Your Campaign Name"
		    aria-describedby="" />
		    <small id="" className="form-text text-muted">We'll never share your email with anyone else.</small>
		  </div>
		  <div className="form-group col-md-6">
		    <label htmlFor="unitSales">Unit Sales</label>
		    <input type="number" className="form-control"
		    onChange={this.onChangeUnitSales}
		    value={this.state.unitSales} id="unitSales" placeholder="Edit Unit Sales"/>
		  </div>
		  <div className="form-group col-md-6">
		    <label htmlFor="campaignCost">Margin</label>
		    <input type="number" className="form-control"
		    onChange={this.onChangeMargin}
		    value={this.state.margin} id="campaignCost" placeholder="Edit Margin"/>
		  </div>
		  <div className="form-group col-md-6">
		    <label htmlFor="campaignCost">Campaign Cost</label>
		    <input type="number" className="form-control"
		    onChange={this.onChangeCampaignCost}
		    value={this.state.campaignCost} id="campaignCost" placeholder="Edit Campaign Cost"/>
		  </div>
		  <div className="col-md-6">
		  <button type="submit" className="btn btn-outline-dark btn-block">Edit</button>
		  </div>
		  <div className="col-md-6">
		  <button type="delete" className="btn btn-outline-dark btn-block">Delete</button>
		  </div>

		  </div>
		</form>

		);
	}
}


