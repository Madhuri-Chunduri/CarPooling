import * as React from "react";
import { getCurrentUser } from "../services/UtilityService";
import { Redirect, Switch, Route, withRouter } from "react-router";
import { BrowserRouter } from "react-router-dom";
import TopNavigationBar from "./TopNavigationBar";
import SignUpComponent from "./SignUpComponent";
import BookRideComponent from "./BookRideComponent";
import ProfileComponent from "./ProfileComponent";
import MyRidesComponent from "./MyRidesComponent";
import RideBookingsComponent from "./RideBookingsComponent";
import DashBoardComponent from "./DashBoardComponent";
import LoginComponent from "./LoginComponent";
import AddRideComponent from "./AddRide";
import { User } from "../Models/User";

class DefaultRouteComponent extends React.Component<any,any>{
    activeUser: User = null;
    constructor(props) {
        super(props);
        this.state = { activeUser: this.activeUser };
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    setCurrentUser = (user: User) => {
        localStorage.setItem('activeUser', JSON.stringify(user));
        this.setState({ activeUser: user });
        this.props.history.push("/dashBoard");
        console.log(this.state.activeUser);
    }

    logOut() {
        localStorage.clear();
        this.setState({ activeUser: null });
        this.props.history.push("/");
    }

    render() {
        var currentUser = getCurrentUser();
        return (
                <BrowserRouter>
                    {currentUser == null ? "":
                    <TopNavigationBar/>}
                    <Switch>
                        <Route path="/signUp" component={() => <SignUpComponent/>} />
                        <Route path="/bookRide" component={() => <BookRideComponent activeUser={currentUser} />} />
                        <Route path="/profile" component={() => <ProfileComponent activeUser={currentUser} />} />
                        <Route path="/offerRide" component={() => <AddRideComponent activeUser={currentUser} />} />
                        <Route path="/myRides" component={() => <MyRidesComponent activeUser={currentUser} />} />
                        <Route exact={true} path="/viewBookings/:rideId">
                            <RideBookingsComponent activeUser={currentUser} />
                        </Route>
                        <Route path="/dashBoard" component={DashBoardComponent} />
                        <Route exact path="/" component={LoginComponent} />
                        {/* <Route  component={({ match }) => {
                            return (
                                <div className="displayComponent">
                                    <TopNavigationBar />
                                    <Redirect to={{ pathname: '/viewBookings', state: { ...match.params } }} />
                                </div>);
                        }}>
                        </Route> */}
                        </Switch>
                </BrowserRouter> 
                // <div className="appBody">
        //         <BrowserRouter>
        //             <TopNavigationBar activeUser={currentUser} logOut={this.logOut} /> 
                   
        //         </BrowserRouter>
        // )
        )
    }
}

export default withRouter(DefaultRouteComponent);