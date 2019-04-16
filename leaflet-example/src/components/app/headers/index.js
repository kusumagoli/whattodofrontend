import React from "react";

import MainHeader from "./mainheader";
import LoggedHeader from "./loggedheader";

class Header extends React.Component {
    render() {
        return (

            <div>  
           
                
                    {
                            ((localStorage.getItem("AccessToken") == null )?
                            <MainHeader history={this.props.history}/>:<LoggedHeader history={this.props.history}/>)
                    }
               
               
                </div> 
        )
    }
}

export default Header;