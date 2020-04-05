import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./home.js";
import Profile from "./profile.js";
import Search from "./search.js";
import Following from "./following";

class App extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/search" component={Search} />
                            <Route
                                exact
                                path="/following"
                                component={Following}
                            />
                            <Route path="/" render={() => <div>404</div>} />
                        </Switch>
                    </Layout>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
