import * as React from "react";
import "../css/MyRides.css";
import { FontIcon } from "office-ui-fabric-react/lib/Icon";

class MyRidesComponent extends React.Component<any,any>{

    rides: any = [{ publisherName: "Clint Barton", from: "cincinnati", to: "Minneapolis", date: "xx/mm/yyyy", time: "5am-9am", price: "180$" },
    { publisherName: "Morgan Stark", from: "cincinnati", to: "Minneapolis", date: "xx/mm/yyyy", time: "3pm-6pm", price: "200$" },
    { publisherName: "Morgan Stark", from: "cincinnati", to: "Minneapolis", date: "xx/mm/yyyy", time: "3pm-6pm", price: "200$" }]
    bookedRides: any;
    offeredRides: any;

    constructor(props){
        super(props);
    }

    render(){
        this.bookedRides = this.rides.map((ride) => (
            <div className="rideCard">
                <div className="cardRow">
                    <div className="publisherName"> {ride.publisherName} </div>
                    <div className="publisherImage">CB</div>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="cardLabel">From</p></span>
                    <span className="rowElement"><p className="cardLabel">To</p></span>
                </div>
                <div className="cardRow">
                    <span className="fromElement"><p className="rideDetails">{ride.from}</p></span>
                    <span className="iconsRow">
                        <FontIcon className="fromIcon" iconName="FullCircleMask" />
                        <FontIcon className="grayIcon" iconName="LocationDot" />
                        <FontIcon className="grayIcon" iconName="LocationDot" />
                        <FontIcon className="grayIcon" iconName="LocationDot" />
                        <FontIcon className="grayIcon" iconName="LocationDot" />
                        <FontIcon className="violetIcon" iconName="POISolid" />
                    </span>
                    <span className="rowElement"><p className="rideTo">{ride.to}</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"> <p className="cardLabel">Date</p></span>
                    <span className="rowElement"> <p className="cardLabel">Time</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"> <p className="rideDetails">{ride.date}</p></span>
                    <span className="rowElement"> <p className="rideDetails">{ride.time}</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="cardLabel">Price</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="rideDetails">{ride.price}</p></span>
                </div>
            </div>
        ))

        this.offeredRides = this.rides.map((ride) => (
            <div className="offeredRideCard">
                <div className="cardRow">
                    <span className="rowElement"><p className="cardLabel">From</p></span>
                    <span className="rowElement"><p className="cardLabel">To</p></span>
                </div>
                <div className="cardRow">
                    <span className="fromElement"><p className="rideDetails">{ride.from}</p></span>
                    <span className="iconsRow">
                        <FontIcon className="fromIcon" iconName="FullCircleMask" />
                        <FontIcon className="grayIcon" iconName="LocationDot" />
                        <FontIcon className="grayIcon" iconName="LocationDot" />
                        <FontIcon className="grayIcon" iconName="LocationDot" />
                        <FontIcon className="grayIcon" iconName="LocationDot" />
                        <FontIcon className="violetIcon" iconName="POISolid" />
                    </span>
                    <span className="rowElement"><p className="rideTo">{ride.to}</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"> <p className="cardLabel">Date</p></span>
                    <span className="rowElement"> <p className="cardLabel">Time</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"> <p className="rideDetails">{ride.date}</p></span>
                    <span className="rowElement"> <p className="rideDetails">{ride.time}</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="cardLabel">Price</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="rideDetails">{ride.price}</p></span>
                </div>
            </div>
        ))

        return(
            <div className="myRidesBody">
                <div className="bookedRides">
                    <div className="bookedRidesHeading"> Booked Rides </div>
                    {this.bookedRides}
                </div>
               
                <div className="offeredRides">
                    <div className="offeredRidesHeading"> Offered Rides </div>
                    {this.offeredRides}
                </div>
            </div>
        )
    }
}

export default MyRidesComponent;