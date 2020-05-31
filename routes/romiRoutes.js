let Romi = require('../models/romi.model');
const router = require('express').Router();

//SHOW All ROMIs and performing actions and calculations on the remaining fields: profitGross and profitNet  
router.route('/').get((req, res) => {
	Romi.find({})
	.then(romis => res.json(romis))
	.catch(err => res.status(400).json('Error: '+ err));
}); 

// SHOW All ROMI with Campaign Name property only 
router.route('/campaigns').get((req, res) => {
	Romi.find({},{campaignName:1})
	.then(romis => res.json(romis))
	.catch(err => res.status(400).json('Error: '+ err));
});  

// SHOW Digitalmixes linked to their appropriate ROMIs 
router.route('/linked').get((req, res) => {
	Romi.find({})
	.populate({path: '_digimix',select: 'digiName'})
	.then(romis => res.json(romis))
	.catch(err => res.status(400).json('Error: '+ err));
});  

// COMPARE 2 (or more TBA) ROMIs 
router.route('/compare').get((req, res) => {
  var netprofit = req.query.netProfitParam;
  var campaingcost = req.query.campaignCostParam;
  var gtNet = req.query.gtNet;
	var ltNet = req.query.ltNet;
  var gtCost = req.query.gtCost;
  var ltCost = req.query.ltCost;  
  console.log(netprofit);
  console.log(campaingcost);
  console.log(gtNet);
  console.log(ltNet);
  console.log(gtCost);
  console.log(ltCost);


if (gtNet === "1" && gtCost === "1"){
	Romi.find({$or:[{profitNet: {$gt: netprofit}},{campaignCost:{$gt: campaingcost}}]})
	.then(romis => res.json(romis))
	.catch(err => res.status(400).json('Error: '+ err));
    console.log("First");
}

 else if (gtNet === "0" && gtCost === "0"){
  Romi.find({$or:[{profitNet: {$lt: netprofit}},{campaignCost:{$lt: campaingcost}}]})
  .then(romis => res.json(romis))
  .catch(err => res.status(400).json('Error: '+ err));
    console.log("Second");
}
 else if (ltNet === "0" && ltCost === "1"){
  Romi.find({$or:[{profitNet: {$gt: netprofit}},{campaignCost:{$lt: campaingcost}}]})
  .then(romis => res.json(romis))
  .catch(err => res.status(400).json('Error: '+ err));
    console.log("3rd");
}    
 else if (ltNet === "1" && ltCost === "0"){
  Romi.find({$or:[{profitNet: {$lt: netprofit}},{campaignCost:{$gt: campaingcost}}]})
  .then(romis => res.json(romis))
  .catch(err => res.status(400).json('Error: '+ err));
    console.log("4th");
} 
});

// GET Single ROMI 
router.route('/edit-romi/:id').get((req, res) => {
  	Romi.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});	

// EDIT Single ROMI 
router.route('/update-romi/:id').put((req, res, next) => {
  Romi.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('ROMI updated successfully !')
    }
  })
})


// CREATE Single ROMI. Zero campaingCost if the user hasn't put a value
router.route('/add').post((req, res) => {
	const campaignName = req.body.campaignName;
	const unitSales = req.body.unitSales;
	const margin = req.body.margin;
  var campaignCost = req.body.campaignCost || 0;
  
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;

	const newRomi = new Romi({
		campaignName,
		unitSales,
		margin,
		campaignCost,
		startDate,
		endDate,
	});

// SAVE Single ROMI 
newRomi.save()
	.then(() => res.json('Romi added!'))
	.catch(err => res.status(400).json('Error: '+ err));

});  

//  Defined update route for Linking ROMI with Digitalmix
router.route('/updatelink').post(function (req, res) {
    Romi.findById(req.body.linkIdCampaign, function(err, romis) {
    if (!romis){
      res.status(404).send("Test data is not found");
    }
    else {
        romis._digimix = req.body.linkIdMix;
        romis.save().then(romis => {
          res.json('Link ROMI and Digitalmix complete');
      })
      .catch(err => {
            res.status(400).send("Unable to update the database");
      });
    }
  });
});

module.exports = router;