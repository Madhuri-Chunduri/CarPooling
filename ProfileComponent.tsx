import * as React from "react";
import "../sass/Profile.sass";
import 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import { FontIcon } from "office-ui-fabric-react/lib/Icon";
import { PutData, setCurrentUser, getCurrentUser } from "../services/UtilityService";
import { User } from "../Models/User";
import { toast } from "react-toastify";

class ProfileComponent extends React.Component<any, any>{
    constructor(props){
        var activeUser : User = getCurrentUser();
        super(props);
        
        this.state = {
            name : activeUser.name, email : activeUser.email, mobile : activeUser.phoneNumber, address : activeUser.address,
            password : activeUser.password,
            errors : { name : "", mobile: "", address: ""},
            validationMessage : ""
        }
        this.updateDetails = this.updateDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    updateDetails(){
        var activeUser : User = getCurrentUser();
        var user : User = new User(activeUser.id,this.state.name,activeUser.email,this.state.mobile,activeUser.password,this.state.address);
        var url = "user/UpdateUser";
        PutData(url,user).then(result=>{
            if(result==true)
            {
                window.location.reload();
                toast.success("Profile updated successfully!!");
                var currentUser = new User(activeUser.id,this.state.name,activeUser.email,this.state.mobile,activeUser.password,this.state.address);
                setCurrentUser(currentUser);
            }
            else{
                toast.error("Sorry!! Some error occured while updating profile :(");
            }
        });
        }

    handleChange(event){
        const target = event.target;
        const fieldName = target.name;
        this.setState({ [fieldName]: event.target.value });
        this.validateField(fieldName, event.target.value);
    }

    validateField(fieldName: string, fieldValue: string) {
        const name = fieldName, value = fieldValue;
        let errors = this.state.errors;
    
        switch (name) {
          case 'name':
            var regex = /^([a-zA-Z ]{2})+([a-zA-Z ])*$/;
            errors.name = regex.test(value) ? '' : 'Please enter a valid name';
            break;
         
          case 'mobile': var regex = /^(?:(?:\+)91(\s*[\ -]\s*)?)?(\d[ -]?){9}\d$/;
            errors.mobile = regex.test(value) ? '' : 'Please enter a valid mobile number';
            if (value.length < 10) errors.mobile = "Mobile number cannot be less than 10 digits";
            if (value.length == 0) errors.mobile = "Mobile number cannot be empty";
            break;
          default:
            break;
        }
    
        this.setState({ errors, [name]: value });
      }
    
      validateForm(errors: any) {
        let count = 0;
    
        Object.values(errors).forEach((value: any) => {
          if (value.length > 0) count += 1;
        });
    
        if (count > 0) {
          this.setState({ validationMessage: "* Please fill the required fields with valid data" });
          return false;
        }
        else this.setState({ validationMessage: "" });
        return true;
      }

    render(){
        let errors = this.state.errors;
        return(
            <div className="ms-Grid offerRideBody" dir="ltr">
            <div className="ms-Grid-row profileBody">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12 updateProfileForm">
                    <p className="formTitle"> Profile </p>
                    <div className="errorValidationMessage">{this.state.validationMessage}</div>
                    <div className="searchFields">

                        <p className="formLabel">Name 
                            {errors.name.length > 0 ?
                                <span className='error'>{errors.name}</span> : ""}
                        </p>
                        <input type="text" className="emptyTextField" onChange={this.handleChange} name="name" value={this.state.name} />

                        <p className="formLabel">Phone Number
                            {errors.mobile.length > 0 ?
                                <span className='error'>{errors.mobile}</span> : ""}
                        </p>
                        <input type="text" className="emptyTextField" onChange={this.handleChange} name="mobile" value={this.state.mobile} />

                        <p className="formLabel">
                            Email (Cannot be updated)
                        </p>
                        <input type="text" className="emptyTextField" value={this.state.email} disabled/>

                        <p className="formLabel">
                            Address
                            {errors.address.length > 0 ?
                                <span className='error'>{errors.address}</span> : ""}
                        </p>
                        <input type="text" className="emptyTextField" onChange={this.handleChange} name="address" value={this.state.address} />

                        <input type="button" className="nextButton" onClick={this.updateDetails} value="Update" />

                    </div>
                </div>
                </div>
                </div>
        )
    }
}

export default ProfileComponent;