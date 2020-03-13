import * as React from "react";
import "../sass/DashBoard.sass";
import { Link, withRouter } from "react-router-dom";
import { getCurrentUser } from "../services/UtilityService";

class DashBoardComponent extends React.Component<any, any>{

    render() {
        var activeUser = getCurrentUser();
        return (
            activeUser==null?"" :
            <div className="dashBoardBody">
                <div className="greeting">
                    <p>Hey {activeUser.name}! </p>
                </div>
                <div className="dashBoardActions">
                    {/* <div className="ms-Grid heightStyle" dir="ltr">
                        <div className="ms-Grid-row heightStyle">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl6 heightStyle"> */}
                    <Link to={"/bookRide"}>
                        <input className="bookRideButton" type="button" value="Book a ride" />
                    </Link>

                    <Link to={"/offerRide"}>
                        <input className="offerRideButton" type="button" value="Offer a ride" />
                    </Link>
                </div>
            </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default withRouter(DashBoardComponent);