import { DocumentCard } from "office-ui-fabric-react";
import React = require("react");

this.offeredRidesList = this.state.offeredRides.map((ride) => {
    var hasBookings = this.hasBookings(ride);
    return (
        <DocumentCard className="rideCard offeredRideCard">
            <div className="cardRow">
                <span className="rowElement"><p className="cardLabel">From</p></span>
                <span className="rowElement"><p className="cardLabel">To</p></span>
            </div>
            <div className="cardRow">
                <span className="rowElement"><p className="rideDetails">{this.capitalise(ride.pickUp)}</p></span>
                {/* <span className="iconsRow">
            <FontIcon className="fromIcon" iconName="FullCircleMask" />
            <FontIcon className="grayIcon" iconName="LocationDot" /> 
            <FontIcon className="grayIcon" iconName="LocationDot" />
            <FontIcon className="grayIcon" iconName="LocationDot" />
            <FontIcon className="violetIcon" iconName="POISolid" />
        </span> */}
                <span className="rowElement"><p className="rideDetails">{this.capitalise(ride.drop)}</p></span>
            </div>
            <div className="cardRow">
                <span className="rowElement"> <p className="cardLabel">Date</p></span>
                <span className="rowElement"> <p className="cardLabel">Time</p></span>
            </div>
            <div className="cardRow">
                <span className="rowElement"> <p className="rideDetails">{this.getDate(ride.startDate)}</p></span>
                <span className="rowElement"> <p className="rideDetails">{ride.startDate.substring(11, 16)}</p></span>
            </div>
            <div className="cardRow">
                <span className="rowElement"><p className="cardLabel">Price</p></span>
                <span className="rowElement"><p className="cardLabel">Status</p></span>
            </div>
            <div className="cardRow">
                <span className="rowElement"><p className="rideDetails">{ride.price}</p></span>
                <span className="rowElement"><p className="rideDetails">{ride.status.value}</p></span>
            </div>
            <div className="cardRow">
                {hasBookings ? <span className="rowElement">
                    <input type="button" onClick={() => this.viewBookings(ride.id)} className="offeredRideButton" value="View Bookings"></input>
                </span> : ""}
                {ride.status.value == 'Not Started' && ride.startDate?
                    <span className="rowElement">
                        <input type="button" onClick={() => this.updateRideStatus(ride)} className="makeRideFinishedButton offeredRideButton" value="Make Ride Finished"></input>
                    </span> : ""}
                {ride.status.value == 'Not Started' && ride.startDate ?
                    <span className="rowElement">
                        <input type="button" onClick={() => this.cancelRide(ride)} className="offeredRideButton" value="Cancel Ride"></input>
                    </span> : ""
                }
            </div>
        </DocumentCard>
    )
})