import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";

class Layout extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {  };
    // }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Container>{this.props.children}</Container>
            </React.Fragment>
        );
    }
}

export default Layout;
