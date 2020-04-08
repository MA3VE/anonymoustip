import web3 from "./web3";
import Post from "./Build/Post";

export default (address) => {
    return new web3.eth.Contract(Post.abi, address);
};
