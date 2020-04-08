import web3 from "./web3";
import Page from "./Build/Page";

export default (address) => {
    return new web3.eth.Contract(Page.abi, address);
};
