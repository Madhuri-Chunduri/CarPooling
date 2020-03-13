import * as React from "react";
import '../sass/SignUp.sass';
import 'office-ui-fabric-react';
import logoIcon from "../images/logo.png";
import axios from "axios";
import { Link, BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { Icon, FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { User } from "../Models/User";
import { AddUser } from "../services/UserService";
import { GetData, setCurrentUser, PostData } from "../services/UtilityService";

initializeIcons();
class SignUpComponent extends React.Component<any, any>{

    constructor(props) {
        super(props);
        this.state = {
            showFirstName: false, showLastName: false, showEmailField: false, showPasswordField: false, showConfirmPasswordField: false, showPassword: false, showConfirmPassword: false,
            email: "", password: "", confirmPassword: "", mobile: "", showMobileNumber: false,
            errors: {
                firstName: "*",
                lastName: "*",
                email: "*",
                mobile: "*",
                password: "*",
                confirmPassword: "*"
            },
            validationMessage: "",
            passwordValidationMessage: ""
        };
        this.readFirstName = this.readFirstName.bind(this);
        this.readLastName = this.readLastName.bind(this);
        this.readEmail = this.readEmail.bind(this);
        this.readMobileNumber = this.readMobileNumber.bind(this);
        this.readPassword = this.readPassword.bind(this);
        this.readConfirmPassword = this.readConfirmPassword.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.showConfirmPassword = this.showConfirmPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
    }

    readFirstName() {
        this.setState({ showFirstName: true });
    }

    readLastName() {
        this.setState({ showLastName: true });
    }

    readMobileNumber() {
        this.setState({ showMobileNumber: true });
    }
    readEmail() {
        this.setState({ showEmailField: true });
    }

    readPassword() {
        this.setState({ showPasswordField: true });
    }

    readConfirmPassword() {
        this.setState({ showConfirmPasswordField: true });
    }

    showPassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    showConfirmPassword() {
        this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
    }

    handleChange(event: any) {
        const target = event.target;
        const fieldName = target.name;
        this.setState({ [fieldName]: event.target.value });
        this.validateField(fieldName, event.target.value);
    }

    validateField(fieldName: string, fieldValue: string) {
        const name = fieldName, value = fieldValue;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                var regex = /^([a-zA-Z ]{2})+([a-zA-Z ])*$/;
                errors.firstName = regex.test(value) ? '' : 'Please enter a valid first name';
                break;
            case 'lastName':
                var regex = /^([a-zA-Z ]{2})+([a-zA-Z ])*$/;
                errors.lastName = regex.test(value) ? '' : 'Please enter a valid last name';
                break;
            case 'email':
                var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
                errors.email =
                    regex.test(value)
                        ? ''
                        : 'Email is not valid';
                break;

            case 'mobile':
                var regex = /^(?:(?:\+)91(\s*[\ -]\s*)?)?(\d[ -]?){9}\d$/;
                errors.mobile = regex.test(value) ? '' : 'Please enter a valid mobile number';
                if (value.length < 10) errors.mobile = "Mobile number cannot be less than 10 digits";
                if (value.length == 0) errors.mobile = "Mobile number cannot be empty";
                break;

            case 'password':
                if (value.length == 0) errors.password = "Password cannot be empty";
                else if (value.length < 8) errors.password = "Password cannot be less than 8 characters";
                else errors.password = "";

            case 'confirmPassword':
                if (value.length == 0) errors.confirmPassword = "Confirm password cannot be empty";
                else errors.confirmPassword = "";
            // else if(value.length != this.state.password) {
            //     errors.confirmPassword = "Password cannot be less than 8 characters";
            // }
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }

    validateForm() {
        let count = 0;
        let errors = this.state.errors;

        Object.values(errors).forEach((value: any) => {
            if (value.length > 0) count += 1;
        });

        if (this.state.password != this.state.confirmPassword) {
            this.setState({ passwordValidationMessage: "Password and confirm password does not match" });
            return false;
        }

        if (count > 0) {
            this.setState({ validationMessage: "* Please fill the below fields with valid data", errors: errors });
            return false;
        }
        else this.setState({ validationMessage: "", errors: errors });
        return true;
    }

    submitDetails() {
        if (this.validateForm()) {
            var name: string = this.state.firstName + " " + this.state.lastName;
            var user: User = new User("-1", name, this.state.email, this.state.mobile, this.state.password);
            const url = "user/AddUser";
            //     axios.defaults.baseURL = 'http://localhost:44362';
            //     axios.defaults.headers.post['Content-Type'] = 'application/json';
            //     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

            //     axios.post(url, user, {
            //         headers: {
            //             'Access-Control-Allow-Origin': '*',
            //         }
            //     }).then((res) => {
            //         try {
            //             setCurrentUser(res.data,name,this.state.email,this.state.mobile);
            //             this.props.history.push("/dashBoard");
            //         }
            //         catch (error) {
            //             console.log(error);
            //         }
            //     }
            //     )
            //     .catch(error => {
            //             console.log(error);
            //         });
            // }
            PostData(url, user).then(data => {
                if (data == "") {
                    this.setState({ validationMessage: "Sorry!! Registration Failed.. Please try again!!" })
                }
                else {
                    var activeUser = new User(data, name, this.state.email, this.state.mobile, this.state.password);
                    const setCurrentUser = this.props.setCurrentUser;
                    setCurrentUser(activeUser);
                    // this.props.history.push("/dashBoard");
                }
            });
        }
    }

    render() {
        const errors = this.state.errors;
        return (
            <div className="signUpContent">
                <div className="ms-Grid-row heightStyle">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg8 ms-xl8 leftContent">
                        {/* ms-Grid-col ms-sm12 ms-md12 ms-lg8 ms-xl8  */}
                        <img src={logoIcon} alt="logo"></img>
                        <div className="tagLine">
                            <span className="grayText">turn</span>
                            <span className="orangeText">miles</span>
                        </div>
                        <div className="tagLine">
                            <span className="grayText">into</span>
                            <span className="violetText">money</span>
                        </div>
                        <div className="grayText subTag">Rides on tap</div>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg4 ms-xl4 signUpForm">
                        {/* ms-Grid-col ms-sm12 ms-md12 ms-lg4 ms-xl4  */}
                        <div className="signUpHeading">Sign Up</div>
                        <div className="logInValidationMessage">{this.state.validationMessage}</div>
                        {/* {errors.firstName.length > 0 && errors.firstName != "*" ?
                            <span className="nameError">{errors.firstName}</span> : ""}

                        {errors.lastName.length > 0 && errors.lastName != "*" ?
                            <span className="nameError">{errors.lastName}</span> : ""}

                        <div className="nameFields">
                            <div className="inputNameField">
                                <input type="text" name="firstName" className="inputTextField" onChange={this.handleChange} value={this.state.firstName} placeholder="First Name" />
                            </div>
                            <div className="inputNameField">
                                <input type="text" name="lastName" className="inputTextField" onChange={this.handleChange} value={this.state.lastName} placeholder="Last Name" />
                            </div> */}
                            {this.state.showFirstName ?
                                <div className="inputTextField">
                                    <p>First Name
                                    {errors.firstName.length > 0 ?
                                            <span className='error'>{errors.firstName}</span> : ""}
                                    </p>
                                    <div><input type="text" name="firstName" className="textField" onChange={this.handleChange} value={this.state.firstName} /></div>
                                </div> : <input type="text" className="inputTextField" onFocus={this.readFirstName} placeholder="FirstName" />
                            }

                            {this.state.showLastName ?
                                <div className="inputTextField">
                                    <p>Last Name
                                    {errors.lastName.length > 0 ?
                                            <span className='error'>{errors.lastName}</span> : ""}
                                    </p>
                                    <div><input type="text" name="lastName" className="textField" onChange={this.handleChange} value={this.state.lastName} /></div>
                                </div> : <input type="text" className="inputTextField" onFocus={this.readLastName} placeholder="LastName" />
                            }

                        {this.state.showEmailField ?
                            <div className="inputTextField">
                                <p>Enter Email Id
                            {errors.email.length > 0 ?
                                        <span className='error'>{errors.email}</span> : ""}
                                </p>
                                <div><input type="text" name="email" className="textField" onChange={this.handleChange} value={this.state.email} /></div>
                            </div> : <input type="text" className="inputTextField" onFocus={this.readEmail} placeholder="Enter Email Id" />
                        }

                        {this.state.showMobileNumber ?
                            <div className="inputTextField">
                                <p>Enter Mobile Number
                            {errors.mobile.length > 0 ?
                                        <span className='error'>{errors.mobile}</span> : ""}
                                </p>
                                <div><input type="text" name="mobile" className="textField" onChange={this.handleChange} value={this.state.mobile} /></div>
                            </div> : <input type="text" className="inputTextField" onFocus={this.readMobileNumber} placeholder="Enter Mobile Number" />
                        }

                        {this.state.showPasswordField ?
                            <div className="inputTextField">
                                <p>Enter Password
                            {errors.password.length > 0 ?
                                        <span className='error'>{errors.password}</span> : ""}
                                </p>
                                <div className="passwordField">
                                    <input name="password" type={this.state.showPassword ? "text" : "password"} className="textField" onChange={this.handleChange} value={this.state.password} />
                                    <button onClick={this.showPassword}>
                                        <Icon iconName={this.state.showPassword ? "Hide" : "RedEye"} />
                                    </button>
                                </div>
                            </div> : <input type="text" className="inputTextField" onFocus={this.readPassword} placeholder="Enter Password" />
                        }
                        {this.state.passwordValidationMessage.length > 0 ? <div className="validationMessage">{this.state.passwordValidationMessage}</div> : ""}
                        {this.state.showConfirmPasswordField ?
                            <div className="inputTextField">
                                <p>Confirm Password
                            {errors.confirmPassword.length > 0 ?
                                        <span className='error'>{errors.confirmPassword}</span> : ""}

                                </p>
                                <div className="passwordField">
                                    <input name="confirmPassword" type={this.state.showConfirmPassword ? "text" : "password"} className="textField" onChange={this.handleChange} value={this.state.confirmPassword} />
                                    <button onClick={this.showConfirmPassword}>
                                        <FontIcon className="grayIcon" iconName={this.state.showConfirmPassword ? "Hide" : "RedEye"} />
                                    </button>
                                </div>
                            </div> : <input type="text" className="inputTextField" onFocus={this.readConfirmPassword} placeholder="Confirm Password" />
                        }
                        <input type="button" className="signUpButton" onClick={this.submitDetails} value="Submit" />

                        <div className="redirect">
                            <p> Already a member? </p>
                            <Link to={"/"}>
                                <u>LOG IN</u>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUpComponent);
