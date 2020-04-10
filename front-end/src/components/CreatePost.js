import React, { Component } from "react";
import { Form, Grid, Button } from "semantic-ui-react";
import { PageAbi } from "../ethereum/Build/Page";
import axios from "axios";

class Createpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: "",
        };
    }

    createPost = async (event) => {
        const { pageAddress, web3, account } = this.props;
        const page = new web3.eth.Contract(PageAbi, pageAddress);
        console.log(account);
        try {
            const txhinfo = await page.methods
                .createPost(this.state.info, true)
                .send({ from: account });
            const postAddress =
                txhinfo.events.getPostAddress.returnValues._postAddress;
            console.log("post address:", postAddress);
            const res = await axios.post("/info", {
                address: postAddress,
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Form onSubmit={this.createPost}>
                        <Form.TextArea
                            placeholder="Share to the world what u think."
                            onChange={(event) =>
                                this.setState({
                                    info: event.target.value,
                                })
                            }
                        />
                        <Button>Submit</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Createpost;
