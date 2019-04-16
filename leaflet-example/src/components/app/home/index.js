import React from "react";

import Slider from "./carousel";
import HomeGrid from "./homegrid";
import Header from "./../headers/index"

class Home extends React.Component {
    render() {
        return (
            
            <div style={{paddingBottom: "120px"}} >   
                    <Header history={this.props.history}/> 
                    <Slider/>
                    <HomeGrid history= {this.props.history}/>

                </div>
             
        )
    }
}

export default Home;