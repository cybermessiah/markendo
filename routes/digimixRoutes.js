let Digimix = require('../models/digimix.model');
const { Router } = require('express');
const router = Router();

// SHOW All Digitalmixes 
router.route('/')
	.get((req, res) => {
	Digimix.find()
		.then(digimixes => res.json(digimixes))
		.catch(err => res.status(400).json('Error: '+ err));
});

// SHOW All Digitalmixes with Diginames only	
router.route('/mixes').get((req, res) => {
	Digimix.find({},{digiName:1})
	.then(digimixes => res.json(digimixes))
	.catch(err => res.status(400).json('Error: '+ err));
});   

// Same as above TBU later on
router.route('/items').get((req, res) => {
	Digimix.find({},{digiName:1})
		.then(digimixes => res.json(digimixes))
		.catch(err => res.status(400).json('Error: '+ err));
});	

// CREATE Digitalmix: Name and corresponding activities
router.route('/add')
	.post( async(req, res) => {
		const { digiName, chosenActivities } = req.body;
		const newDigimix = new Digimix({
			digiName,
			chosenActivities
		});
		await newDigimix.save();
		console.log(newDigimix);
		res.json({message:' Digital Marketing Mix Added '})
});	

module.exports = router;		


