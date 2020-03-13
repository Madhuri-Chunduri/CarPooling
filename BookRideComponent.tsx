import * as React from "react";
import "../sass/BookRide.sass";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { DatePicker } from "office-ui-fabric-react";
import { initializeIcons } from '@uifabric/icons';
import { withRouter } from "react-router";
import { GetData, PostData, getCurrentUser } from "../services/UtilityService";
import { Booking } from "../Models/Booking";
import { User } from "../Models/User";

initializeIcons();
toast.configure({ hideProgressBar: true });
class BookRideComponent extends React.Component<any, any>{

    timeSlots = ["5am-9am", "9am-12pm", "12pm-3pm", "3pm-6pm", "6pm-9pm", "Entire Day"]
    currentDate: string;
    container: any;
    rides: any = [];
    rideTime: string;

    constructor(props: any) {
        super(props);
        this.state = {
            errors: { from: "*", to: "*", seats: "*", timeSlot: "*" }, showAvailableRides: false,
            showNoRidesMessage: false,
            selectedTimeSlot: -1,
            from: "",
            to: "",
            date: new Date(),
            seats: 0,
            timeSlot: "",
            validationMessage: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onFormatDate = this.onFormatDate.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
        this.showBookingStatus = this.showBookingStatus.bind(this);
        this.confirmBooking = this.confirmBooking.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const fieldName = target.name;
        let errors = this.state.errors;

        this.setState({ [fieldName]: event.target.value });
        if (fieldName == "seats") {
            if (isNaN(event.target.value)) {
                errors.seats = "Please enter valid seat count";
            }
            else if (event.target.value > 3) {
                errors.seats = "Seats cannot be greater than 3";
            }
            else if (event.target.value <= 0) errors.seats = "Seats cannot be empty";
            else errors.seats = "";
        }
        this.validateField(fieldName, event.target.value);
        this.setState({ errors: errors });
    }

    validateField(fieldName: string, fieldValue: string) {
        let errors = this.state.errors;

        switch (fieldName) {
            case 'from':
                if (fieldValue.length < 0) {
                    errors.from = "From cannot be empty";
                }
                else {
                    var regex = /^([a-zA-Z ]{2})+([a-zA-Z ])*$/;
                    errors.from = regex.test(fieldValue) ? '' : 'Please enter a valid From';
                }
                break;

            case 'to':
                if (fieldValue.length < 0) {
                    errors.to = "To cannot be empty";
                }
                else {
                    var regex = /^([a-zA-Z ]{2})+([a-zA-Z ])*$/;
                    errors.to = regex.test(fieldValue) ? '' : 'Please enter a valid To';
                }
                break;

            case 'date': if (fieldValue.length < 0) {
                errors.date = "Date cannot be empty";
            }
            else errors.date = "";
                break;

        }
        this.setState({ errors: errors });
    }

    validateForm() {
        let count = 0;
        let errors = this.state.errors;

        Object.values(errors).forEach((value: any) => {
            if (value.length > 0) count += 1;
        });

        if (count > 0) {
            this.setState({ validationMessage: "* Please fill the below fields with valid data", errors: errors });
            return false;
        }

        if (this.state.selectedTimeSlot == -1) {
            errors.timeSlot = "Please select a time slot";
        }

        else this.setState({ validationMessage: "", errors: errors });
        return true;
    }

    submitDetails() {
        if (this.validateForm()) {
            var activeUser : User = getCurrentUser();
            var url = "Ride/FindRide?from=" + this.state.from + "&to=" + this.state.to;
            GetData(url).then(data => {
                if (data == "") {
                    this.setState({ showNoRidesMessage: true, showAvailableRides: false });
                }
                else {
                    this.rides = []
                    const moment = require('moment');
                    data.forEach(ride => {
                        if (ride.publisher.id != activeUser.id) {
                            if (this.state.selectedTimeSlot == 5) {
                                if (ride.availableSeats >= this.state.seats) {
                                    this.rides.push(ride);
                                }
                            }
                            else {
                                var startDate = new Date(ride.startDate);
                                if (new moment(startDate).format('YYYY-MM-DD') == new moment(this.state.date).format('YYYY-MM-DD')) {
                                    var time = ride.startDate.substring(11, 16);
                                    var timeSlot = this.timeSlots[this.state.selectedTimeSlot];
                                    if (this.state.selectedTimeSlot > 1) {
                                        var rideTime = (parseInt(time.substring(0, 2)) - 12) + "";
                                        if (timeSlot.substring(0, 1) < rideTime) {
                                            if (ride.availableSeats >= this.state.seats) {
                                                this.rides.push(ride);
                                            }
                                        }
                                    }
                                    else {
                                        if (parseInt(timeSlot.substring(0, 1)) < parseInt(time.substring(0, 2))) {
                                            if (ride.availableSeats >= this.state.numberOfSeats) {
                                                this.rides.push(ride);
                                            }
                                        }
                                        else if (parseInt(timeSlot.substring(4, 5)) > parseInt(time.substring(0, 2))) {
                                            if (ride.availableSeats >= this.state.numberOfSeats) {
                                                this.rides.push(ride);
                                            }
                                            this.rides.push(ride);
                                        }
                                    }
                                }
                            }
                        }
                    });
                    if (this.rides.length == 0) {
                        this.setState({ showNoRidesMessage: true, showAvailableRides: false });
                    }
                    else this.setState({ showAvailableRides: true, showNoRidesMessage: false });
                }
            });
        }
    }

    selectedTimeSlot(currentIndex) {
        let errors = this.state.errors;
        errors.timeSlot = "";
        this.setState({ selectedTimeSlot: currentIndex, errors: errors });
    }

    onSelectDate = (date: Date | null | undefined): void => {
        this.setState({ date: date });
    };

    onFormatDate = (date: Date): string => {
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

        return dd + '/' + mm + '/' + yyyy;
    };

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

        return yyyy + '-' + mm + '-' + dd;
    };

    showBookingStatus() {
        this.props.history.push("/myRides");
        toast.success("Booking successful", { className: "success-toast" });
    }

    confirmBooking = (id, price) => {
        var activeUser : User = getCurrentUser();
        // const moment = require('moment')
        var bookingDate = this.getFormattedDate(this.state.date) + 'T' + "00:00:00";
        var bookingDateTime = new Date(bookingDate);
        var url = "booking/AddBooking";
        var booking: Booking = new Booking("-1", id, this.state.from, this.state.to, activeUser.id, this.state.seats, price, bookingDateTime);
        PostData(url, booking).then(data => {
            if (data == 1) {
                toast.success("Booking successful", { className: "success-toast" });
            }
            else if (data == 0) {
                toast.error("Booking failed", { className: "success-toast" });
            }
            else if (data == -1) {
                toast.info("There are not enough seats to book this ride");
            }
        });
    }

    getFirstName(name) {
        var words = name.split(" ");
        return words[0];
    }

    getProfileName(name) {
        var words = name.split(" ");
        if (words.length == 1) return words[0][0];
        else return words[0][0] + words[1][0];
    }

    matchedRides: any = []

    render() {
        var today = new Date();
        let errors = this.state.errors;
        const timeSlotsList = this.timeSlots.map((timeSlot, index) => {
            return (
                <li key={index} onClick={() => this.selectedTimeSlot(index)} className={this.state.selectedTimeSlot == index ? "activeListElement" : ""}>
                    {timeSlot}
                </li>
            )
        });

        this.matchedRides = this.rides.map((ride) => (
            <div className="matchCard">
                <div className="cardRow">
                    <div className="publisherName"> {this.getFirstName(ride.publisher.name)} </div>
                    <div className="publisherImage">{this.getProfileName(ride.publisher.name)}</div>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="cardLabel">From</p></span>
                    <span className="rowElement"><p className="cardLabel">To</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="rideDetails">{ride.pickUp.charAt(0).toUpperCase()}{ride.pickUp.slice(1)}</p></span>
                    <span className="rowElement"><p className="rideDetails">{ride.drop.charAt(0).toUpperCase()}{ride.drop.slice(1)}</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"> <p className="cardLabel">Date</p></span>
                    <span className="rowElement"> <p className="cardLabel">Time</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"> <p className="rideDetails">{this.onFormatDate(new Date(ride.startDate))}</p></span>
                    <span className="rowElement"> <p className="rideDetails">{ride.startDate.substring(11, 16)}</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="cardLabel">Price</p></span>
                </div>
                <div className="cardRow">
                    <span className="rowElement"><p className="rideDetails">{ride.price}</p></span>
                </div>
                <input type="button" onClick={() => this.confirmBooking(ride.id, ride.price)} className="submitButton" value="Book Ride" />
            </div>
        ))
        return (
                <div className="ms-Grid bookRideBody" dir="ltr">
                    <div className="ms-Grid-row bookRideGridBody">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl4 searchRideForm">
                            <div className="toast-top-right">
                                <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={5000} hideProgressBar={true} />
                            </div>
                            <p className="formTitle"> Book a Ride </p>
                            <p className="formTag"> we get you the matches asap !</p>
                            <div className="errorValidationMessage">{this.state.validationMessage}</div>
                            <div className="searchFields">
                                <p className="formLabel">From
                                {errors.from.length > 0 ?
                                        <span className='error'>{errors.from}</span> : ""
                                    }
                                </p>
                                <input type="text" className={this.state.from.length == 0 ? "emptyTextField" : "filledTextField"} onChange={this.handleChange} name="from" value={this.state.from} />
                                <p className="formLabel">To
                                {errors.to.length > 0 ?
                                        <span className='error'>{errors.to}</span> : ""
                                    }
                                </p>
                                <input type="text" className={this.state.to.length == 0 ? "emptyTextField" : "filledTextField"} onChange={this.handleChange} name="to" value={this.state.to} />
                                <p className="formLabel">Date</p>
                                <DatePicker className="dateField" minDate={today} value={this.state.date}
                                    isRequired={true} onSelectDate={this.onSelectDate}></DatePicker>

                                <p className="formLabel">Number of Seats
                                {errors.seats.length > 0 ?
                                        <span className='error'>{errors.seats}</span> : ""
                                    }
                                </p>
                                <input type="number" className={this.state.seats == 0 ? "emptyTextField" : "filledTextField"} onChange={this.handleChange} min="1" max="3" value={this.state.seats} name="seats" />
                                <p className="formLabel"> Time
                                {errors.timeSlot.length > 0 ?
                                        <span className='error'>{errors.timeSlot}</span> : ""
                                    }
                                </p>
                                <div className="timeSlotList">
                                    <ul>
                                        {timeSlotsList}
                                    </ul>
                                </div>
                                <input type="button" className="submitButton" onClick={this.submitDetails} value="Submit" />
                            </div>
                        </div>

                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl8">
                            {this.state.showAvailableRides ?
                                <div className="matchedRidesList">
                                    <p className="matchedRidesHeading"> Your Matches </p>
                                    <div className="ms-Grid" dir="ltr">
                                        <div className="ms-Grid-row">
                                            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 bookRideGridBody">
                                                {this.matchedRides}
                                            </div>
                                        </div>
                                    </div>
                                </div> : ""
                            }
                            {this.state.showNoRidesMessage ?
                                <div className="matchedRidesList">
                                    <p className="noRidesMessage">
                                        Sorry!! No rides your way!! Please try with another day or time..
                            </p>
                                </div> : ""}
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(BookRideComponent);