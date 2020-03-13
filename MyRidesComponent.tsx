import * as React from "react";
import "../sass/MyRides.sass";
import 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { FontIcon } from "office-ui-fabric-react/lib/Icon";
import { getCurrentUser, GetData, PutData } from "../services/UtilityService";
import { User } from "../Models/User";
import { Booking } from "../Models/Booking";
import { toast } from "react-toastify";
import { Ride } from "../Models/Ride";
import RideBookingsComponent from "./RideBookingsComponent";
import { withRouter } from "react-router";
import { Status } from "../Models/Status";
import { DocumentCard } from "office-ui-fabric-react";
import DefaultPage from "./DefaultPage";

class MyRidesComponent extends React.Component<any, any>{

    bookedRides: any = [];
    offeredRides: any = [];
    rideBookings = [];
    bookedRidesList: any;
    offeredRidesList: any;

    constructor(props) {
        super(props);
        this.state = {
            showRides: false, offeredRides: [], bookedRides: [], showNoBookedRidesMessage: false, showNoOfferedRidesMessage: false,
            viewRideBookings: false, rideBookings:[] 
        };
        this.hasBookings = this.hasBookings.bind(this);
    }

    componentDidMount() {
        var activeUser : User = getCurrentUser();
        var offeredRidesUrl = "Ride/GetAllRidesByUserId/" + activeUser.id;
        GetData(offeredRidesUrl).then(data => {
            if (data == "") {
                this.offeredRides = [];
                this.setState({ showNoOfferedRidesMessage: true });
            }
            else {
                this.setState({ offeredRides: data });
                this.state.offeredRides.forEach(ride => {
                        this.rideBookings.push(this.hasBookings(ride));
                        console.log(this.rideBookings);
                    });
            }
        });

        // this.state.offeredRides.forEach(ride => {
        //     this.rideBookings.push(this.hasBookings(ride));
        //     console.log(this.rideBookings);
        // });

        var bookedRidesUrl = "Booking/GetBookingsByUserId/" + activeUser.id;
        GetData(bookedRidesUrl).then(data => {
            if (data == "") {
                this.bookedRides = [];
                this.setState({ showNoBookedRidesMessage: true });
            }
            else {
                this.setState({ bookedRides: data });
            }
        });

        this.setState({ showRides: true, offeredRides: this.offeredRides, bookedRides: this.bookedRides });
    }

    getDate(date) {
        date = date.substring(0, 10);
        return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
    }

    capitalise(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    getFormattedDate = (date: Date): string => {
        // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
        var today = new Date(date);
        var dd = today.getDate().toString();
        var mm = (today.getMonth() + 1).toString();
        var yyyy = today.getFullYear();
        if (parseInt(dd) < 10) {
            dd = '0' + dd.toString();
        }
        if (parseInt(mm) < 10) {
            mm = '0' + mm.toString();
        }
        var hours = today.getHours().toString();
        var minutes = today.getMinutes().toString();
        var seconds = today.getSeconds().toString();

        return yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + minutes + ':' + seconds;
    };

    cancelBooking(bookedRide: Booking) {
        var url = "Booking/UpdateBooking";
        bookedRide.status.value = "Cancelled";
        PutData(url, bookedRide).then(result => {
            try {
                if (result == true) {
                    // toast.success("Booking Cancelled Successfully!!");
                    window.location.reload();
                }
                else toast.error("Sorry!! Unable to cancel booking");
            }
            catch (error) {
                toast.error("Sorry!! Unable to cancel booking");
            }
        })
    }

    updateRideStatus(ride: Ride) {
        var url = "ride/UpdateRide";
        ride.Status = new Status("-1", "Ride", "Finished");
        ride.Status.value = "Finished";
        PutData(url, ride).then(result => {
            try {
                if (result == true) {
                    // toast.success("Ride Status Updated Successfully!!");
                    window.location.reload();
                }
                else toast.error("Sorry!! Unable to update ride status");
            }
            catch (error) {
                toast.error("Sorry!! Unable to update ride status");
            }
        })
    }

    cancelRide(ride) {
        var url = "ride/UpdateRide";
        ride.Status = new Status("-1", "Ride", "Cancelled");
        // ride.Status.value = "Cancelled";
        PutData(url, ride).then(result => {
            try {
                if (result == true) {
                    // toast.success("Ride cancelled successfully!!");
                    window.location.reload();
                }
                else toast.error("Sorry!! Unable to cancel ride");
            }
            catch (error) {
                toast.error("Sorry!! Unable to cancel ride");
            }
        })
    }

    viewBookings(rideId: string) {
        //    this.setState({selectedRideId : rideId, viewRideBookings : true});
        this.props.history.push("/viewBookings/" + rideId);
    }

    getProfileName(name) {
        var words = name.toUpperCase().split(" ");
        if (words.length == 1) return words[0][0];
        if (words.length > 1 && words[1][0] == undefined) return words[0][0];
        else return words[0][0] + words[1][0];
    }

    hasBookings(ride) {
        var url = "booking/GetBookingsByRideId/" + ride.Id;
        return GetData(url).then(result => {
            try {
                if (result.length == 0) {
                    return false;
                }
                else return true;
            }
            catch (error) {
                return false;
            }
        })
    }

    render() {
        var date = new Date();
        var today = this.getFormattedDate(date);
        console.log(today);
        if (this.state.showRides) {
            this.bookedRidesList = this.state.bookedRides.map((bookedRide) => (
                <div className="rideCard">
                    <div className="ms-Grid" dir="ltr">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <div className="ridePublisherName"> {this.capitalise(bookedRide.ride.publisher.name)} </div>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <div className="ridePublisherImage">{this.getProfileName(bookedRide.ride.publisher.name)}</div>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <p className="cardLabel">From</p>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <p className="cardLabel">To</p>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <p className="rideDetails">{bookedRide.pickUp}</p>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <p className="rideDetails">{bookedRide.drop}</p>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6"> 
                                <p className="cardLabel">Date</p>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6"> 
                                <p className="cardLabel">Time</p>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6"> 
                                <p className="rideDetails">{this.getDate(bookedRide.ride.startDate)}</p>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6"> 
                                <p className="rideDetails">{bookedRide.ride.startDate.substring(11, 16)}</p>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <p className="cardLabel">Price </p>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <p className="cardLabel">Status </p>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <p className="rideDetails">{bookedRide.price}</p>
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                <p className="rideDetails">{bookedRide.status.value}</p>
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            {bookedRide.ride.startDate >= today && bookedRide.status.value != 'Cancelled' && bookedRide.status.value != 'Rejected' ?
                                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                                    <input type="button" onClick={() => this.cancelBooking(bookedRide)} className="submitButton violetButton" value="Cancel Booking"></input>
                                </div> : ""}
                        </div>
                    </div>
                </div>
            ))
        }

        this.offeredRidesList = this.state.offeredRides.map((ride,index) => (
            <div className="rideCard offeredRideCard">
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="cardLabel">From</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="cardLabel">To</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="rideDetails">{this.capitalise(ride.pickUp)}</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="rideDetails">{this.capitalise(ride.drop)}</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="cardLabel">Date</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="cardLabel">Time</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="rideDetails">{this.getDate(ride.startDate)}</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="rideDetails">{ride.startDate.substring(11, 16)}</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="cardLabel">Price</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="cardLabel">Status</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="rideDetails">{ride.price}</p>
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
                            <p className="rideDetails">{ride.status.value}</p>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12">
                           {this.rideBookings[index] ?  
                           <input type="button" onClick={() => this.viewBookings(ride.id)} className="offeredRideButton" value="View Bookings"></input> : 
                           <div className="rideDetails"> There are no bookings yet!</div>
                           }
                        
                            {ride.status.value == 'Not Started' && ride.startDate < today ?
                                <span className="rowElement">
                                    <input type="button" onClick={() => this.updateRideStatus(ride)} className="makeRideFinishedButton offeredRideButton" value="Finish Ride"></input>
                                </span> : ""}
                            {ride.status.value == 'Not Started' && ride.startDate > today ?
                                <span className="rowElement">
                                    <input type="button" onClick={() => this.cancelRide(ride)} className="offeredRideButton" value="Cancel Ride"></input>
                                </span> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        ))

        return (
            getCurrentUser()!=null ?
            // !this.state.viewRideBookings ? 
            <div className="myRidesBody">
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl6">
                            <div className="bookedRides">
                                <div className="bookedRidesHeading">Booked Rides</div>
                                <div className="ms-Grid bookedRidesList" dir="ltr">
                                    <div className="ms-Grid-row bookedRidesList">
                                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 bookedRidesList">
                                            {this.state.showNoBookedRidesMessage ?
                                                <div className="noRides noBookedRides">
                                                    You have no booked rides!!
                                            </div> :
                                                <div className="bookedRides">{this.bookedRidesList}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl6">
                            <div className="offeredRides">
                                <div className="offeredRidesHeading">Offered Rides</div>
                                <div className="ms-Grid offeredRidesList" dir="ltr">
                                    <div className="ms-Grid-row offeredRidesList">
                                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 offeredRidesList">
                                            {this.state.showNoOfferedRidesMessage ?
                                                <div className="noRides">
                                                    You have no offered rides!!
                                            </div> :
                                                <div>{this.offeredRidesList}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> : ""
            // : <RideBookingsComponent rideId={this.state.selectedRideId} hideBookings={this.hideBookings}/>
        )
    }
}

export default withRouter(MyRidesComponent);