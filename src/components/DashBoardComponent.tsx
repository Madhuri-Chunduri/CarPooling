import * as React from "react";
import "../css/DashBoard.css";
import { Link, Router, BrowserRouter, Route } from "react-router-dom";
import TopNavigationBar from "./TopNavigationBar";
import BookRideComponent from "./BookRideComponent";
import OfferRideComponent from "./OfferRideComponent";

class DashBoardComponent extends React.Component<any, any>{
    render() {
        return (
            <div className="dashBoardBody">
                <div className="greeting">
                    <p>Hey John! </p>
                </div>
                <div className="dashBoardActions">
                    <Link to={"/bookRide"}>
                        <input className="bookRideButton" type="button" value="Book a ride" />
                    </Link>
                    
                    <Link to={"/offerRide"}>
                        <input className="offerRideButton" type="button" value="Offer a ride" />
                    </Link>
                </div>
            </div>
        )
    }
}

export default DashBoardComponent;