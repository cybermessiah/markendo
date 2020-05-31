const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const romiSchema = new Schema({
	campaignName: { type: String, required:true },
	unitSales: { type: Number, required:true },
	margin: { type: Number, required:true },
	campaignCost: Number,
 	startDate: Date,
	endDate: Date,
	profitGross: { type: Number },
  profitNet: { type: Number },
	_digimix: { type: Schema.Types.ObjectId, ref: 'digimix', required:false }
}, {
	timestamps: true,
});

// Pre-saving to calculate the Net and Gross profit
romiSchema
.pre('save', function(next){
  this.profitGross = this.unitSales*this.margin
  this.profitNet = (this.unitSales*this.margin) - this.campaignCost
  next();   
});

// Post-Updating to obtain the Net and Gross profit when the values are Edited / Updated 
// It calls again Pre-saving for the necessary calculations

romiSchema.post('findOneAndUpdate', async function() {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.save(function(err) {
       if(!err) {
         console.log("Document Updated");
        }
     });
  console.log(docToUpdate.profitGross); //checking result
});


const Romi = mongoose.model('Romi', romiSchema);

module.exports = Romi;