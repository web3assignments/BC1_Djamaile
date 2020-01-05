pragma solidity >= 0.4.21 < 0.7.0;
import "./proveableAPI.sol";

contract HelloWorld is usingProvable {
    string public imageUrl;

    event gotImage(string image);
    event newImage(string image);

    constructor() public {
        getNasaImage();
    }

     function __callback(
        bytes32 _myid,
        string memory _result
    )
        public
    {
        require(msg.sender == provable_cbAddress(), "Not the right user");
        imageUrl = _result;
        emit newImage(imageUrl);
    }

    function bytes32ToStr(bytes32 _bytes32) public pure returns (string memory) {
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];
            }
        return string(bytesArray);
    }

    function getNasaImage()
        public
        payable
    {
        imageUrl = bytes32ToStr(provable_query("URL", 'json(https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY).url'));
        emit gotImage(imageUrl);
    }
}