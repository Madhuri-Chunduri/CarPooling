import * as React from "react";
import "../css/BookRide.css";
import TopNavigationBar from "./TopNavigationBar";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { FontIcon } from "office-ui-fabric-react/lib/Icon";
import { number } from "prop-types";

initializeIcons();
class BookRideComponent extends React.Component<any, any>{

    timeSlots = ["5am-9am", "9am-12pm", "12pm-3pm", "3pm-6pm", "6pm-9pm"]
    currentDate: string;

    constructor(props: any) {
        super(props);
        this.state = {
            errors: { from: "*", to: "*", date: "*", seats: "*", timeSlot: "*" }, showAvailableRides: false,
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
        this.submitDetails = this.submitDetails.bind(this);
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
            else if (event.target.value.length <= 0) errors.seats = "Seats cannot be empty";
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
        else this.setState({ validationMessage: "", errors: errors });
        return true;
    }

    submitDetails() {
        if (this.validateForm()) {
            let errors = this.state.errors;

            if (this.state.selectedTimeSlot == -1) {
                errors.timeSlot = "Please select a time slot";
            }
            this.setState({ showAvailableRides: true, errors: errors });
        }
    }

    selectedTimeSlot(currentIndex) {
        let errors = this.state.errors;
        errors.timeSlot = "";
        this.setState({ selectedTimeSlot: currentIndex, errors: errors });
    }

    matchedRides: any = []

    render() {

        let date = this.state.date;
        // var rideDay = date.getDate();
        // var rideMonth = date.getMonth()+1;
        // var rideYear = date.getFullYear();

        // var rideDate = rideDay+'/'+rideMonth+"/"+rideYear;

        let time = this.timeSlots[this.state.selectedTimeSlot];
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            var day = '0' + dd.toString();
        }
        if (mm < 10) {
            var month = '0' + mm.toString();
        }

        this.currentDate = yyyy + '-' + month + '-' + day;
        console.log(this.currentDate);

        let rides = [{ publisherName: "Clint Barton", from: this.state.from, to: this.state.to, date: date, time: time, price: "180$" },
        { publisherName: "Morgan Stark", from: this.state.from, to: this.state.to, date: date, time: time, price: "200$" }]


        let errors = this.state.errors;
        const timeSlotsList = this.timeSlots.map((timeSlot, index) => {
            return (
                <li key={index} onClick={() => this.selectedTimeSlot(index)} className={this.state.selectedTimeSlot == index ? "activeListElement" : ""}>
                    {timeSlot}
                </li>
            )
        });

        this.matchedRides = rides.map((ride) => (
            <div className="matchCard">
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
                <input type="button" className="submitButton" value="Book Ride" />
            </div>
        ))
        return (
            <div className="bookRideBody">
                <div className="searchRideForm">
                    <p className="formTitle"> Book a Ride </p>
                    <p className="formTag"> we get you the matches asap !</p>
                    <div className="errorValidationMessage">{this.state.validationMessage}</div>
                    <div className="searchFields">
                        <p className="formLabel">From
                            {errors.from.length > 0 ?
                                <span className='error'>{errors.from}</span> : ""}
                        </p>
                        <input type="text" className={this.state.from.length == 0 ? "emptyTextField" : "filledTextField"} onChange={this.handleChange} name="from" value={this.state.from} />
                        <p className="formLabel">To
                        {errors.to.length > 0 ?
                                <span className='error'>{errors.to}</span> : ""}
                        </p>
                        <input type="text" className={this.state.to.length == 0 ? "emptyTextField" : "filledTextField"} onChange={this.handleChange} name="to" value={this.state.to} />
                        <p className="formLabel">Date
                        {errors.date.length > 0 ?
                                <span className='error'>{errors.date}</span> : ""}
                        </p>
                        <input type="date" min={this.currentDate} className={this.state.date == null ? "emptyTextField" : "filledTextField"} onChange={this.handleChange} name="date" value={this.state.date} placeholder="xx/mm/yyyy" />
                        <p className="formLabel">Number of Seats
                        {errors.seats.length > 0 ?
                                <span className='error'>{errors.seats}</span> : ""}
                        </p>
                        <input type="number" className={this.state.seats == 0 ? "emptyTextField" : "filledTextField"} onChange={this.handleChange} min="1" max="3" value={this.state.numberOfSeats} name="seats" />
                        <p className="formLabel"> Time
                        {errors.timeSlot.length > 0 ?
                                <span className='error'>{errors.timeSlot}</span> : ""}</p>
                        <div className="timeSlotList">
                            <ul>
                                {timeSlotsList}
                            </ul>
                        </div>
                        {/* <label className="radioButton">
                            <input type="radio" value="Teemad" />
                            Teemad
                        </label> */}
                        <input type="button" className="submitButton" onClick={this.submitDetails} value="Submit" />
                    </div>
                </div>

                {this.state.showAvailableRides ?
                    <div className="matchedRidesList">
                        <p className="matchedRidesHeading"> Your Matches </p>
                        <div className="matchedRides">
                            {this.matchedRides}
                        </div>
                    </div> : ""
                }
            </div>
        )
    }
}

export default BookRideComponent;