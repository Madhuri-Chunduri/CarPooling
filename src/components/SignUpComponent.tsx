import * as React from "react";
import '../css/SignUp.sass';
import logoIcon from "../images/logo.png";
import { Link, BrowserRouter, Switch, Route } from "react-router-dom";
import 'office-ui-fabric-react/dist/css/fabric.css';
import { initializeIcons } from '@uifabric/icons';
import { Icon, FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { User } from "../services/User";
import { AddUser } from "../services/UserService";

initializeIcons();
class SignUpComponent extends React.Component<any, any>{

    constructor(props) {
        super(props);
        this.state = {
            showEmailField: false, showPasswordField: false, showConfirmPasswordField: false, showPassword: false, showConfirmPassword: false,
            email : "", password : "", confirmPassword : "",
            errors: {
                email: "*",
                password: "*",
                confirmPassword: "*"
            },
            validationMessage : "",
            passwordValidationMessage : ""
        };
        this.readEmail = this.readEmail.bind(this);
        this.readPassword = this.readPassword.bind(this);
        this.readConfirmPassword = this.readConfirmPassword.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.showConfirmPassword = this.showConfirmPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
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
          case 'email':
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
            errors.email =
              regex.test(value)
                ? ''
                : 'Email is not valid';
            break;
          
            case 'password' : 
                if(value.length==0) errors.password = "Password cannot be empty";
                else if(value.length<8) errors.password = "Password cannot be less than 8 characters";
                else errors.password="";

            case 'confirmPassword' : 
                if(value.length==0) errors.confirmPassword = "Confirm password cannot be empty";
                else errors.confirmPassword ="";
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

        if(this.state.password!=this.state.confirmPassword){
            this.setState({passwordValidationMessage : "Password and confirm password does not match"});
            return false;
        } 

        if (count > 0) {
          this.setState({  validationMessage: "* Please fill the below fields with valid data", errors : errors });
          return false;
        }
        else this.setState({ validationMessage: "", errors : errors});
        return true;
      }

      submitDetails() {
        if (this.validateForm()) {
          var user : User = new User(-1,this.state.email,this.state.password);
          AddUser(user);
          this.props.history.push("/dashBoard");
        }
      }

    render() {
        const errors = this.state.errors;
        return (
            <div className="signUpContent">
                <div className="leftContent">
                        <img src={logoIcon} alt="logo"></img>
                    <div className="tagLine">
                        <span className="grayText">turn</span>
                        <span className="orangeText">miles</span>
                        <div>
                            <span className="grayText">into</span>
                            <span className="violetText">money</span>
                        </div>
                    </div>
                    <div className="grayText subTag">Rides on tap</div>
                </div>
                <div className="signUpForm">
                    <div className="heading">Sign Up</div>
                    <div className="validationMessage">{this.state.validationMessage}</div>
                    {this.state.showEmailField ?
                        <div className="inputTextField">
                            <p className="textFieldName">Enter Email Id 
                            {errors.email.length > 0 ?
                                    <span className='error'>{errors.email}</span> : ""}
                            </p>
                            <div><input type="text" name="email" className="textField" onChange={this.handleChange} value={this.state.email}/></div>
                        </div> : <input type="text" className="inputTextField" onFocus={this.readEmail} value="Enter Email Id" />
                    }
                    {this.state.showPasswordField ?
                        <div className="inputTextField">
                            <p className="textFieldName">Enter Password 
                            {errors.password.length > 0 ?
                                    <span className='error'>{errors.password}</span> : ""}
                            </p>
                            <div className="passwordField">
                                <input name="password" type={this.state.showPassword ? "text" : "password"} className="textField" onChange={this.handleChange} value={this.state.password} />
                                <button className="hideIcon" onClick={this.showPassword}><Icon iconName={this.state.showPassword ? "Hide" : "RedEye"} /></button>
                            </div>
                        </div> : <input type="text" className="inputTextField" onFocus={this.readPassword} value="Enter Password" />
                    }
                    {this.state.passwordValidationMessage.length>0 ? <div className="validationMessage">{this.state.passwordValidationMessage}</div> : ""}
                    {this.state.showConfirmPasswordField ?
                        <div className="inputTextField">
                            <p className="textFieldName">Confirm Password 
                            {errors.confirmPassword.length > 0 ?
                                    <span className='error'>{errors.confirmPassword}</span> : ""}

                            </p>
                            <div className="passwordField">
                                <input name="confirmPassword" type={this.state.showConfirmPassword ? "text" : "password"} className="textField"  onChange={this.handleChange} value={this.state.confirmPassword}/>
                                <button className="hideIcon" onClick={this.showConfirmPassword}><FontIcon className="grayIcon" iconName={this.state.showConfirmPassword ? "Hide" : "RedEye"} /></button>
                            </div>
                        </div> : <input type="text" className="inputTextField" onFocus={this.readConfirmPassword} value="Confirm Password" />
                    }
                        <input type="button" className="signUpButton" onClick={this.submitDetails} value="Submit" />
                   
                    <div className="redirect">
                        <p> Already a member? </p>
                        <Link to={"/login"}>
                            <u>LOG IN</u>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpComponent;

//https://stackoverflow.com/questions/38590598/react-js-add-remove-input-field-on-click-of-a-button