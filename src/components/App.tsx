import * as React from "react";
import "../css/App.css";
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom';
import SignUpComponent from './SignUpComponent';
import DashBoardComponent from "./DashBoardComponent";
import BookRideComponent from "./BookRideComponent";
import OfferRideComponent from "./OfferRideComponent";
import LoginComponent from "./LoginComponent";
import TopNavigationBar from "./TopNavigationBar";
import MyRidesComponent from "./MyRidesComponent";

class App extends React.Component<any, any>{
    render() {
        return (
            <div className="appBody">
                <BrowserRouter>
                    <Switch>
                        <Route path="/bookRide">
                            <div className="displayComponent">
                                <TopNavigationBar />
                                <BookRideComponent />
                            </div>
                        </Route>
                        <Route path="/offerRide">
                            <div className="displayComponent">
                                <TopNavigationBar />
                                <OfferRideComponent />
                            </div>
                        </Route>
                        <Route path="/myRides">
                        <div className="displayComponent">
                                <TopNavigationBar />
                                <MyRidesComponent />
                            </div>
                        </Route>
                        <Route path="/dashBoard">
                        <div className="displayComponent">
                                <TopNavigationBar />
                                <DashBoardComponent />
                            </div>
                        </Route>
                        <Route path="/signUp" component={SignUpComponent} />
                        <Route path="/" component={LoginComponent} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;