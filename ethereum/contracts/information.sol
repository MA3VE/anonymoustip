pragma solidity >=0.5.0 <0.7.0;


contract Page {
    string public userName;
    address payable creator;
    address[] public posts;

    constructor(string memory _userName) public {
        creator = msg.sender;
        userName = _userName;
    }

    modifier restricted() {
        require(msg.sender == creator, "You are not the creator of this page");
        _;
    }

    function changeUserName(string memory _userName) public restricted {
        userName = _userName;
    }

    function getPosts() public view returns (address[] memory) {
        return posts;
    }

    function createPost(string memory _info, bool _changeable)
        public
        restricted
    {
        address newPost = address(new Post(_info, _changeable, creator));
        posts.push(newPost);
    }
}


contract Post {
    address payable public creator;
    bool public changeable;
    string public info;

    constructor(string memory _info, bool _changeable, address payable _creator)
        public
    {
        creator = _creator;
        info = _info;
        changeable = _changeable;
    }

    modifier restricted() {
        require(
            msg.sender == creator,
            "this function can only be called by creator"
        );
        _;
    }

    function change(string memory _info) public restricted {
        require(changeable == true, "this is unchangeable info");
        info = _info;
    }

    function destroy() public restricted {
        require(changeable == true, "this is unchangeable info");
        selfdestruct(creator);
    }
}
