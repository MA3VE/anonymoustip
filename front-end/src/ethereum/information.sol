pragma solidity >=0.5.0 <0.7.0;


contract Factory {
    mapping(address => address) public pageAddress;
    mapping(address => address payable) public creatorAddress;

    function createPage() public {
        address newAddress = address(new Page());
        pageAddress[msg.sender] = newAddress;
        creatorAddress[pageAddress[msg.sender]] = msg.sender;
    }
}


contract Page {
    address payable public creator;
    address[] public posts;
    Factory factory;

    constructor() public {
        factory = Factory(msg.sender);
    }

    modifier restricted() {
        if (creator == 0x0000000000000000000000000000000000000000) {
            creator = factory.creatorAddress(address(this));
        }
        require(msg.sender == creator, "You are not the creator of this page");
        _;
    }

    function getPosts() public view returns (address[] memory) {
        return posts;
    }

    function createPost(string memory _info, bool _changeable)
        public
        restricted
    {
        posts.push(address(new Post(_info, _changeable)));
    }

    function deletePage() public restricted {
        selfdestruct(creator);
    }
}


contract Post {
    bool public changeable;
    string public info;
    address payable public creator;

    constructor(string memory _info, bool _changeable) public {
        Page page = Page(msg.sender);
        creator = page.creator();
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
