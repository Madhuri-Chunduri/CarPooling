import * as React from "react";
import "../sass/RideBooking.sass";
import { GetData, PutData } from "../services/UtilityService";
import { toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import { Booking } from "../Models/Booking";

class RideBookingsComponent extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = { showNoBookingsMessage: false, rideBookings: [], selectedRideId: this.props.match.params.rideId, reload: false }
        // this.hideBookings = this.hideBookings.bind(this);
        // this.getBookings = this.getBookings.bind(this);
    }

    componentDidMount() {
        var url = "booking/GetBookingsByRideId/" + this.state.selectedRideId;
        GetData(url).then(result => {
            try {
                if (result.length == 0) {
                    this.setState({ showNoBookingsMessage: true });
                }
                else this.setState({ rideBookings: result });
            }
            catch (error) {
                console.log(error);
                toast.error("Unable to display ride bookings!!");
            }
        })
    }

    approveBooking(booking: Booking) {
        booking.status.value = "Approved";
        var url = "booking/UpdateBooking";
        PutData(url, booking).then(result => {
            try {
                if (result == 1) {
                    window.location.reload();
                    toast.success("Approved Booking");
                }
                else if (result == 0) toast.error("Booking Approval failed");
                else if (result == -1) {
                    toast.error("Seats for this ride are already full");
                    booking.status.value = "Pending";
                }
                this.setState({ reload: true });
            }
            catch (error) {
                console.log(error);
                toast.error("Booking Approval Failed");
            }
        })
    }

    rejectBooking(booking: Booking) {
        booking.status.value = "Rejected";
        var url = "booking/UpdateBooking";
        PutData(url, booking).then(result => {
            try {
                if (result == 1) {
                    window.location.reload();
                    toast.success("Rejected Booking");
                }
                else if (result == 0) toast.error("Failed to reject booking");
                else if (result == -1) toast.error("Seats for this ride are already full");
                this.setState({ reload: true });
            }
            catch (error) {
                console.log(error);
                toast.error("Failed to reject booking");
            }
        })
    }

    getProfileName(name) {
        var words = name.split(" ");
        if (words.length == 1 || words[1][0]==undefined) return words[0][0];
        else return words[0][0] + words[1][0];
    }

    render() {
        // var rideBookings = this.getBookings(this.props.match.params.rideId);

        var bookingsList = this.state.rideBookings.map((booking) => (
            <div className="bookingCard">
                <div className="cardRow">
                    <div className="ridePublisherName"> {booking.bookedBy.name} </div>
                    <div className="publisherImage">{this.getProfileName(booking.bookedBy.name)}</div>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="cardLabel">From</p></span>
                    <span className="rowElement"><p className="cardLabel">To</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="rideDetails">{booking.pickUp}</p></span>
                    <span className="rowElement"><p className="rideDetails">{booking.drop}</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="cardLabel">Number Of Seats </p></span>
                    <span className="rowElement"><p className="cardLabel">Status </p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="rideDetails">{booking.numberOfSeatsBooked}</p></span>
                    <span className="rowElement"><p className="rideDetails">{booking.status.value}</p></span>
                </div>
                <div className="cardRow">
                    {booking.status.value == "Pending" ?
                        <div className="bookingActions">
                            <input type="button" className="actionButton" onClick={() => this.approveBooking(booking)} value="Approve" />
                            <input type="button" className="actionButton" onClick={() => this.rejectBooking(booking)} value="Reject" />
                        </div> : ""}
                </div>
            </div>
        ))

        return (
            <div className="rideBookingsBody">
                <div className="bookingsHeading">
                    <Link to="/myRides">
                       Go Back to My Rides 
                    </Link>
                </div>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4 ms-xl4 rideBookings">
                            {this.state.showNoBookingsMessage ?
                                <div className="showNoRidesMessage">
                                    <div className="message"> There are no bookings for this ride </div>
                                    <div>
                                        <Link to="/myRides"> <input type="button" className="goBackButton" value="Go back to My Rides Page" /></Link></div>
                                </div> :
                                <div className="bookingsList">
                                    {bookingsList}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(RideBookingsComponent);