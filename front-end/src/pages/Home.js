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
    loadWeb3() {
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then((account) => {
                    this.setState({ account: account[0] });
                    this.setState({ web3 });
                });
            } catch (e) {
                this.setState({ web3error: e });
            }
        }
        // Legacy DApp Browsers
        else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
            this.setState({ web3 });
        }
    }
    componentWillMount() {
        this.loadWeb3();
    }
    async loadData() {
        this.setState({ ethloading: true });
        const { web3, account } = this.state;
        const factory = new web3.eth.Contract(
            factoryAbi,
            "0x40021847b4d1a32671f83145de3d94862ca266d5"
        );
        // console.log(factory);
        const pageAddress = await factory.methods.pageAddress(account).call();
        this.setState({ pageAddress });
        this.setState({ ethloading: false });
    }
    render() {
        if (this.state.web3error !== null) {
            return <h6>{this.state.web3error}</h6>;
        } else if (this.state.web3 === null) {
            return <h6>not an ether browser</h6>;
        } else {
            this.loadData();

            return this.state.pageAddress ===
                "0x0000000000000000000000000000000000000000" ? (
                <CreatePage />
            ) : (
                <h1>{this.state.account}</h1>
            );
        }
    }
}

export default Home;
