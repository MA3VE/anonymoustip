import Web3 from "web3";
const fs = require("fs");

const infurakey = fs.readFileSync(".infurakey").toString().trim();

const web3 = new Web3(
    Web3.givenProvider || `https://rinkeby.infura.io/v3/${infurakey}`
);

export default web3;
