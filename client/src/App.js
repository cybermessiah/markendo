import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


import Navbar from "./containers/navbar.component";
import ListRomis from "./containers/list-romis.component";
import CreateRomi from "./containers/create-romi.component";
import EditRomis from "./containers/edit-romis";
import CompareRomis from "./containers/compare-romis.component";
import LinkRomiMix from "./containers/link-romi-mix.component";
import DigitalMarketingActivities from "./containers/digital-marketing-activities.component";
import SearchMain from "./containers/search-main.component";

function App() {

  return (
    <Router>
       <div className="container"> 
        <Navbar />
        <br/>
        <Route path="/" exact component={ListRomis}/>
        <Route path="/create" component={CreateRomi}/>
        <Route path="/editromis" component={EditRomis}/>
        <Route path="/searchromis" component={SearchMain}/>
        <Route path="/compare" component={CompareRomis}/>
        <Route path="/digitalmarketingmix" component={DigitalMarketingActivities}/>
        <Route path="/linkromimix" component={LinkRomiMix}/>
        </div>
    </Router>
  );
}

export default App;
