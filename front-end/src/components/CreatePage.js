import React, { Component } from "react";
import { Form, Button, Grid, Input } from "semantic-ui-react";
import axios from "axios";

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "" };
        // console.log("web3 = ", props.web3);
        // console.log("account = ", props.account);
    }

    createPage = async (event) => {
        event.preventDefault();
        console.log("sumbited");
        const { factory, account } = this.props;
        const txhinfo = await factory.methods
            .createPage()
            .send({ from: account });
        const pageAddress = txhinfo.events.createdPage.returnValues._newAddress;
        try {
            const res = await axios.post("/page", {
                address: pageAddress,
                name: this.state.name,
            });
            console.log(res);
            window.location.reload(false);
        } catch (e) {
            console.log(e);
        }
    };
    render() {
        return (
            <React.Fragment>
                <Grid columns={2} centered>
                    <Grid.Column>
                        <h1>New to hear!! Create Page to continue</h1>
                        <Form onSubmit={this.createPage}>
                            <Form.Field>
                                <label>User Name</label>
                                <Input
                                    placeholder="First Name"
                                    value={this.state.name}
                                    onChange={(event) =>
                                        this.setState({
                                            name: event.target.value,
                                        })
                                    }
                                />
                            </Form.Field>
                            <Button primary>Create</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}

export default CreatePage;
