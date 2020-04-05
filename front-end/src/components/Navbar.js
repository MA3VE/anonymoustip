import React, { Component } from "react";
import { Input, Menu, Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    state = { activeItem: "home" };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <React.Fragment>
                <Menu secondary inverted color="grey">
                    <Container>
                        <Menu.Item
                            name="AnonymousTip"
                            active={activeItem === "AnonymousTip"}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/"
                        ></Menu.Item>

                        <Menu.Menu>
                            <Menu.Item>
                                <Input icon="search" placeholder="Search..." />
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu.Item
                            name="profile"
                            active={activeItem === "profile"}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/profile"
                        />
                        <Menu.Item
                            name="following"
                            active={activeItem === "following"}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/following"
                        />
                    </Container>
                </Menu>
            </React.Fragment>
        );
    }
}

export default Navbar;
