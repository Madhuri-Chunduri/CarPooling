import * as React from "react";
import "../css/BookRide.css";
import "../css/OfferRide.css";
import TopNavigationBar from "./TopNavigationBar";
import { withRouter } from "react-router";

class OfferRideComponent extends React.Component<any, any>{

    timeSlots = ["5am-9am", "9am-12pm", "12pm-3pm", "3pm-6pm", "6pm-9pm"]
    availableSeatsList = [1, 2, 3]
    currentDate: string;

    constructor(props: any) {
        super(props);
        this.state = {
            rideDetailsErrors: { from: "*", to: "*", date: "*", seats: "*", timeSlot: "*" }, addViaPoint: false, showAvailableSeats: true, viaPointCount: 1,
            viaPoints: [], showNextPage: false, showAddButton: true, selectedTimeSlot: -1, availableSeats: -1,
            stop1 : "",
            from: "",
            to: "",
            date: new Date(),
            seats: 0,
            timeSlot: "",
            validationMessage: "",
            seatsValidationMessage : ""
        };
        this.addViaPoint = this.addViaPoint.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateRideForm = this.validateRideForm.bind(this);
        this.submitRideDetails = this.submitRideDetails.bind(this);
        this.publishRide = this.publishRide.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const fieldName = target.name;
        let errors = this.state.rideDetailsErrors;

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
        let errors = this.state.rideDetailsErrors;

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

    validateRideForm(errors: any) {
        let count = 0;

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

    submitRideDetails() {
        if (this.validateRideForm(this.state.rideDetailsErrors)) {
            let errors = this.state.rideDetailsErrors;

            if (this.state.selectedTimeSlot == -1) {
                errors.timeSlot = "Please select a time slot";
            }
            this.setState({ showNextPage: true, errors: errors });
        }
    }

    selectedTimeSlot(currentIndex) {
        let errors = this.state.rideDetailsErrors;
        errors.timeSlot = "";
        this.setState({ selectedTimeSlot: currentIndex, errors: errors });
    }

    addViaPoint() {
        var viaPointCount: number = this.state.viaPointCount;
        viaPointCount += 1;
        if (this.state.viaPointCount < 4) {
            const viaPoints = this.state.viaPoints.concat(ViaPointField);
            // this.setState({addViaPoint : true,  showAvailableSeats : false, viaPointCount : viaPointCount});
            this.setState({ viaPoints: viaPoints, viaPointCount: viaPointCount, });
        }
        this.setState({ showAddButton: false });
    }

    selectedAvailableSeats(seatCount) {
        this.setState({ availableSeats: seatCount });
    }

    publishRide(){
        if(this.state.availableSeats == -1){
            this.setState({seatsValidationMessage : "* Please select available seats"});
        }
        else {
            this.setState({seatsValidationMessage : ""});
            this.props.history.push("/myRides");
        }
    }

    render() {

        let errors = this.state.rideDetailsErrors;

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

        const viaPoints = this.state.viaPoints.map((Element, index: number) => {
            if(index == this.state.viaPoints.length-1){
                return(
                    <div>
                    <p className="formLabel">Stop {index + 2}</p>
                    <span className="newInputField">
                        <Element key={index} index={index} />
                        {this.state.showAddButton ? "" : <input type="button" className="addViaPointButton" onClick={this.addViaPoint} value="+" />}
                    </span>
                </div>
                )
            }
            return (
                <div>
                    <p className="formLabel">Stop {index + 2}</p>
                    <span className="inputField">
                        <Element key={index} index={index} />
                    </span>
                </div>
            )
        });

        const timeSlotsList = this.timeSlots.map((timeSlot, index) => {
            return (
                <li key={index} onClick={() => this.selectedTimeSlot(index)} className={this.state.selectedTimeSlot == index ? "activeListElement" : ""}>{timeSlot}</li>
            )
        });

        const availableSeats = this.availableSeatsList.map((seatCount) => {
            return (
                <li key={seatCount} onClick={() => this.selectedAvailableSeats(seatCount)} className={this.state.availableSeats == seatCount ? "selectedSeatCount" : ""}>
                    {seatCount}
                </li>
            )
        })
        return (
            <div className="offerRideBody">
                <div className="searchRideForm">
                    <p className="formTitle"> Offer a Ride </p>
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
                        <input type="date" min={this.currentDate} className={this.state.date == null ? "emptyTextField" : "filledTextField"} onChange={this.handleChange} name="date"
                            value={this.state.date} placeholder="xx/mm/yyyy" />

                        <p className="formLabel">Number of Seats
                            {errors.seats.length > 0 ?
                                <span className='error'>{errors.seats}</span> : ""}
                        </p>
                        <input type="number" className={this.state.seats == 0 ? "emptyTextField" : "filledTextField"} onChange={this.handleChange} min="1" max="3" name="seats" value={this.state.seats} />
                        <p className="formLabel"> Time</p>
                        <div className="timeSlotList">
                            <ul>
                                {timeSlotsList}
                            </ul>
                        </div>
                        <input type="button" className="nextButton" onClick={this.submitRideDetails} value="Next>>" />
                    </div>
                </div>

                {this.state.showNextPage ?
                    <div className="searchRideForm">
                        <p className="formTitle"> Offer a Ride </p>
                        <p className="formLabel"> we get you the matches asap !</p>
                        <div className="searchFields">
                            <p className="formLabel">Stop 1</p>
                            <span className="inputField">
                                <input type="text" className={this.state.stop1.length == 0 ? "emptyField" : "filledField"} 
                                    onChange={this.handleChange} name="stop1" value={this.state.stop1} />
                                {this.state.showAddButton ? <input type="button" className="addViaPoint" onClick={this.addViaPoint} value="+" /> : ""}
                            </span>
                        </div>
                        <div className="viaPoint">
                            {viaPoints}
                            {/* {this.state.showAddButton ? "" : <input type="button" className="addViaPointButton" onClick={this.addViaPoint} value="+" />} */}
                        </div>
                        <div className="cardRow">
                            <span className="rowElement"> <p className="rowLabel">Available Seats
                                <div className="error">{this.state.seatsValidationMessage}</div>
                            </p></span>
                            <span className="rowElement"> <p className="rowLabel">Price</p></span>
                        </div>
                        <div className="cardRow">
                            <span className="rowElement">
                                <ul className="availableSeats">
                                    {availableSeats}
                                </ul>
                            </span>
                            <span className="rowElement">
                                <p className="price">180$</p>
                            </span>
                        </div>
                        <input type="button" className="submitButton" onClick={this.publishRide} value="Submit" />
                    </div>

                    : ""}
            </div >
        )
    }
}

class ViaPointField extends React.Component<any, any>{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { isStopEmpty: true };
    }

    handleChange = (event) => {
        if (event.target.value.length > 0) {
            this.setState({ isStopEmpty: false });
        }
    }

    render() {
        return (
            <div className="viaPointField">
                <span className="inputField">
                    <input type="text" className={this.state.isStopEmpty ? "emptyField" : "filledField"} onChange={this.handleChange} name="Stop" />
                </span>
            </div>
        )
    }
}


export default withRouter(OfferRideComponent);