import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/Layout";
import Following from "./pages/Following";

class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Layout>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/Profile" exact component={Profile} />
                            <Route path="/Search" exact component={Search} />
                            <Route
                                path="/Following"
                                exact
                                component={Following}
                            />
                            <Route path="/" component={PageNotFound} />
                        </Switch>
                    </Layout>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
