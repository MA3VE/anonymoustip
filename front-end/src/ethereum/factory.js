import web3 from "./web3";
import Factory from "./build/Factory.json";

const instance = new web3.eth.Contract(
    Factory.abi,
    "0x40021847B4d1a32671f83145DE3D94862Ca266d5"
);

export default instance;
