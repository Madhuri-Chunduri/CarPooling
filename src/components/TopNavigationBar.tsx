import * as React from "react";
import "../css/TopNavigationBar.css";
import logoIcon from "../images/logo.png";
import { Link } from "react-router-dom";

class TopNavigationBar extends React.Component<any, any>{

    constructor(props) {
        super(props);
        this.state = { showUserActions: false, selectedAction: "" };
        this.showUserActions = this.showUserActions.bind(this);
    }

    showUserActions() {
        this.setState({ showUserActions: !this.state.showUserActions });
    }

    selectedAction(action: string) {
        this.setState({ selectedAction: action, showUserActions: false });
    }

    render() {
        return (
            <div className="topNavigationBar">
                <ul>
                    <li className="logoIcon">
                        <img src={logoIcon} alt="logo-icon" />
                    </li>
                    <li className="activeUser">
                        <p className="activeUserName"> John Wills</p>
                        <input className="activeUserImage" type="button" onClick={this.showUserActions} value="JW" />
                    </li>
                </ul>

                {this.state.showUserActions ?
                    <div className="actionsPopUp">
                        <Link to="/profile">
                            <li key="profile" onClick={() => this.selectedAction("profile")} className={this.state.selectedAction == "profile" ? "activeListElement" : ""}>
                                <div className="popUpButton">Profile</div>
                            </li>
                        </Link>

                        <Link to="/myRides">
                            <li key="myRides" onClick={() => this.selectedAction("myRides")} className={this.state.selectedAction == "myRides" ? "activeListElement" : ""}>
                                <div className="popUpButton"> My Rides </div>
                            </li>
                        </Link>

                        <Link to="/login">
                            <li key="logout" onClick={() => this.selectedAction("logout")} className={this.state.selectedAction == "logout" ? "activeListElement" : ""}>
                                <div className="popUpButton">Logout</div>
                            </li>
                        </Link>
                    </div> : ""
                }
            </div>
        )
    }
}

export default TopNavigationBar;