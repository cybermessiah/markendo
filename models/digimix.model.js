const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const digimixSchema = new Schema({
	digiName: { type: String, required:true },
	chosenActivities: [{
		chosen: String,
		cost: String
	}], 
	period: Number,
}, {
	timestamps: true,
});

const Digimix = mongoose.model('digimix', digimixSchema);

module.exports = Digimix;