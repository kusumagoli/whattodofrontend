import React from "react";

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import Home from "./components/app/home/index";
import Login from "./components/app/signup/login";
import Register from "./components/app/signup/register";
import CardView from "./components/app/mapview/cardview";
import Profile from "./components/app/userprofile/userprofile";
import View from "./components/app/Details/viewdetails";
import Maps from "./components/map";
import Footer from "./components/app/footer";
import ScheduleView from "./components/app/mapview/scheduleview";
import CreateAttraction from "./components/app/userprofile/createattraction";
import UpdateAttractions from "./components/app/userprofile/updateattraction";





class App extends React.Component {
    render () {
        return (
            <Router>
                <div className = "App">
                
                   
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                   <Route exact path="/signup" component={Register} />
                   <Route exact path="/cardview" component={CardView} />                
                   <Route exact path="/profile" component={Profile} />
                   <Route exact path="/view" component={View} />
                   <Route exact path="/map" component={Maps} />
                   <Route exact path="/create" component={CreateAttraction} />
                   <Route exact path="/editattr" component={UpdateAttractions} />
                   <Route exact path="/schedule" component={ScheduleView} />
                <Footer/>              
             </div>
                
        </Router>
                        )
    }
}

export default App;