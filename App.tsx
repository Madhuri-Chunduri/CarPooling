import * as React from "react";
import "../sass/App.sass";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import SignUpComponent from './SignUpComponent';
import DashBoardComponent from "./DashBoardComponent";
import BookRideComponent from "./BookRideComponent";
import LoginComponent from "./LoginComponent";
import TopNavigationBar from "./TopNavigationBar";
import MyRidesComponent from "./MyRidesComponent";
import ProfileComponent from "./ProfileComponent";
import AddRideComponent from "./AddRide";
import RideBookingsComponent from "./RideBookingsComponent";
import { getCurrentUser } from "../services/UtilityService";
import { User } from "../Models/User";
import DefaultRouteComponent from "./DefaultRouteComponent";

class App extends React.Component<any, any>{

    constructor(props) {
        super(props);
    }
    render() {
        var activeUser = getCurrentUser();
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/signUp" component={SignUpComponent} />
                    <Route exact path="/" component={LoginComponent} />
                    <Route path="/offerRide">
                        <TopNavigationBar />
                        <AddRideComponent/>
                    </Route>
                    <Route path="/bookRide">
                        <TopNavigationBar />
                        <BookRideComponent/>
                    </Route>
                    <Route path="/myRides">
                        <TopNavigationBar />
                        <MyRidesComponent/>
                    </Route>
                    <Route path="/profile">
                        <TopNavigationBar />
                        <ProfileComponent/>
                    </Route>
                    <Route exact path="/viewBookings/:rideId">
                        <TopNavigationBar />
                        <RideBookingsComponent/>
                    </Route>
                    <Route path="/dashBoard">
                        <TopNavigationBar />
                        <DashBoardComponent />
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;