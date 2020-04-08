import React, { Component } from "react";
import { Form, Button, Grid } from "semantic-ui-react";

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <h1>New to hear!! Create Page to continue</h1>
                    <Form>
                        <Form.Field>
                            <label>User Name</label>
                            <input placeholder="First Name" />
                        </Form.Field>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default CreatePage;
