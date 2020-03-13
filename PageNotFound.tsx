import * as React from "react";
import "../sass/PageNotFound.sass";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FontIcon, initializeIcons } from "office-ui-fabric-react";
import 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.css';

initializeIcons()
class PageNotFound extends React.Component<any,any>{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="pageNotFoundBody">
                <p className="message">
                <FontIcon className="fromIcon" iconName="ProcessingCancel" /> 404 Page Not Found
                </p>
                <Link to="/dashBoard" className="redirectLink">
                    <u>Go Back To DashBoard Page</u>
                </Link>
            </div>
        )
    }
}

export default withRouter(PageNotFound);