import React, { Component } from "react";
import { Card, Button, Grid } from "semantic-ui-react";
const axios = require("axios");

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount = async () => {
        const { address } = this.props;
        try {
            console.log(address);
            const response = await axios.get("/info/0xkdjffsdfndasfsdlkjfhsdf");
            this.setState({ likes: response.data.likes });
            this.setState({ dislikes: response.data.dislikes });
        } catch (error) {
            console.error(error);
        }
    };

    inclike = async (event) => {
        console.log("like");
        try {
            // console.log("started");
            await axios.patch("/info/0xkdjffsdfndasfsdlkjfhsdf/incLike");
            const response = await axios.get("/info/0xkdjffsdfndasfsdlkjfhsdf");
            // console.log(response);
            this.setState({ likes: response.data.likes });
            // console.log("ended");
        } catch (error) {
            console.log(error);
        }
    };

    dislike = async (event) => {
        console.log("dislike");
        try {
            await axios.patch("/info/0xkdjffsdfndasfsdlkjfhsdf/incdisLike");
            const response = await axios.get("/info/0xkdjffsdfndasfsdlkjfhsdf");
            this.setState({ dislikes: response.data.dislikes });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <Grid columns={2} centered>
                <Grid.Column>
                    <Card fluid>
                        <Card.Content
                            header={this.props.name}
                            meta={this.props.address}
                        ></Card.Content>
                        <Card.Content description={this.props.description} />
                        <Card.Content extra>
                            <div className="ui two buttons">
                                <Button
                                    onClick={this.inclike}
                                    basic
                                    color="green"
                                >
                                    Like({this.state.likes})
                                </Button>
                                <Button
                                    basic
                                    color="red"
                                    onClick={this.dislike}
                                >
                                    Dislike({this.state.dislikes})
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        );
    }
}

export default PostCard;
