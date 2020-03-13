import * as React from "react";
import "../sass/TopNavigationBar.sass";
import logoIcon from "../images/logo.png";
import { Link, NavLink, withRouter } from "react-router-dom";
import { getCurrentUser } from "../services/UtilityService";
import { User } from "../Models/User";
import DefaultPage from "./DefaultPage";

class TopNavigationBar extends React.Component<any, any>{

    constructor(props) {
        super(props);
        this.state = { showUserActions: true, selectedAction: "" };
        this.showUserActions = this.showUserActions.bind(this);
        this.logout = this.logout.bind(this);
    }

    showUserActions() {
        this.setState({ showUserActions: !this.state.showUserActions });
    }

    selectedAction(action: string) {
        this.setState({ selectedAction: action, showUserActions: false });
    }

    getFirstName(name) {
        var words = name.split(" ");
        return words[0];
    }

    getProfileName(name) {
        var words = name.split(" ");
        if (words.length == 1) return words[0][0];
        else if (words[1][0] != undefined) return words[0][0] + words[1][0];
        else return words[0][0];
    }

    logout() {
        localStorage.clear();
        this.props.history.push("/");
    }

    render() {
        var activeUser = getCurrentUser();
        return (
            getCurrentUser() == null ? <DefaultPage /> :
                <div className="ms-Grid topNavigationBar" dir="ltr">
                    <div className="ms-Grid-row">
                        <ul>
                            <div className="ms-Grid-col ms-sm4 ms-md4 ms-lg1 ms-xl1 logoIcon">
                                <li>
                                    <img src={logoIcon} alt="logo-icon" />
                                </li>
                            </div>
                            <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg11 ms-xl11">
                                <li  className="activeUser">
                                    <p className="activeUserName">{activeUser.name}</p>
                                    <input className="activeUserImage" type="button" value={this.getProfileName(activeUser.name)} />
                                    <div className="actionsPopUp">
                                        <NavLink className="popUpButton" activeClassName="activeListElement" to="/profile"> Profile </NavLink>
                                        <NavLink className="popUpButton" activeClassName="activeListElement" to="/dashBoard"> Dashboard </NavLink>
                                        <NavLink className="popUpButton" activeClassName="activeListElement" to="/myRides"> My Rides </NavLink>
                                        <li key="logout" onClick={() => this.logout()}>
                                            <div className="popUpButton">Logout</div>
                                        </li>
                                    </div>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
        )
    }
}

export default withRouter(TopNavigationBar);