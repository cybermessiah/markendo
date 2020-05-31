
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser:true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
})

const romiRouter = require('./routes/romiRoutes');
const digimixRouter = require('./routes/digimixRoutes');

app.use('/romis', romiRouter);
app.use('/digimix', digimixRouter);

if (process.env.NODE_ENV === 'production') {           
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
