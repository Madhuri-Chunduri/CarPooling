import * as React from "react";
import "../sass/DefaultPage.sass";
import { Link } from "react-router-dom";

class DefaultPage extends React.Component<any,any>{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="defaultPageBody">
                <div className="message"> Sorry!! You have been logged out!! Please login again to continue</div>
                <Link to="/">
                    <u>Go To Login Page</u>
                </Link>
            </div>
        )
    }
}

export default DefaultPage;