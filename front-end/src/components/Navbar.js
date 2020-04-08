import React, { Component } from "react";
import { Input, Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class MenuExampleSecondary extends Component {
    state = { activeItem: "AnonymousTip" };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <Menu secondary inverted color="grey">
                <Container>
                    <Menu.Item
                        name="AnonymousTip"
                        active={activeItem === "AnonymousTip"}
                        onClick={this.handleItemClick}
                        as={Link}
                        to="/"
                    />
                    <Menu.Item
                        name="Following"
                        active={activeItem === "Following"}
                        onClick={this.handleItemClick}
                        as={Link}
                        to="/Following"
                    />
                    <Menu.Item
                        name="Profile"
                        active={activeItem === "Profile"}
                        onClick={this.handleItemClick}
                        as={Link}
                        to="/Profile"
                    />
                    {/* <Menu.Menu position="right"> */}
                    <Menu.Item>
                        <Input icon="search" placeholder="Search..." />
                    </Menu.Item>
                    {/* </Menu.Menu> */}
                </Container>
            </Menu>
        );
    }
}
