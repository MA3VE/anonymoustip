import React, { Component } from "react";
import Web3 from "web3";
import { factoryAbi } from "../ethereum/Build/Factory.js";
import CreatePage from "../components/CreatePage";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
            web3error: null,
            account: null,
            ethloading: false,
        };
    }

    loadWeb3 = async () => {
        let web3;
        let account;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                const accounts = await window.ethereum.enable();
                account = accounts[0];
                this.setState({ account, web3 }, async () => {
                    const factory = new web3.eth.Contract(
                        factoryAbi,
                        "0x762972Ed2C834227Ecba2Abe99A24625b7282986"
                    );
                    const pageAddress = await factory.methods
                        .pageAddress(account)
                        .call();
                    this.setState({ pageAddress, factory });
                });
            } catch (e) {
                this.setState({ web3error: e });
            }
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
            this.setState({ web3 });
        }
    };

    componentWillMount = async () => {
        this.loadWeb3();
    };

    render() {
        return this.state.pageAddress ===
            "0x0000000000000000000000000000000000000000" ? (
            <CreatePage
                factory={this.state.factory}
                account={this.state.account}
            />
        ) : (
            <h1>{this.state.pageAddress}</h1>
        );
    }
}

export default Home;
