pragma solidity ^0.5.12;

import "./BokkyPooBahsDateTimeLibrary.sol";
import "./safemath.sol";
import "./RBAC.sol";

/// @title A Calorie tracker
/// @author Djamaile Rahamat
/// @dev some functions can be extracted to their own file
contract Calorie {
    
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event NewFoodItem(string message, uint id, string foodName, uint cal);
    event calorieBurned(string message, uint cal);
    event checkedCalByDate(string message, uint dateSearched);
    event paidUser(string message, uint paid, uint userBalance);
    event contractGot(string message, uint eth, uint contractBalance);

    uint public eatenCal;
    uint public burnedCal;
    uint public totalCal = eatenCal - burnedCal;
    uint public dailyLimit = 1900;
    address public user;
    bool isStopped = false;
    Whitelist whitelist;
    
   modifier stoppedInEmergency {require(!isStopped); _; }
   modifier onlyAuthorized { require(msg.sender == user); _;}

    struct FoodItem {
        address User;
        string foodName;
        uint cal;
        uint dateReg;
        uint id;
    }

    FoodItem[] public foodItems;
    mapping(address => FoodItem) foodItemMap;
    mapping (uint => address) public foodToOwner;
    mapping(bytes32 => uint) totalCaloriesByDate;
    mapping(address => uint) userBalance;
    mapping (address => uint) ownerFoodItemCount;
    
    constructor(address _whitelistAddress) public payable {
        whitelist = Whitelist(_whitelistAddress);
        user = msg.sender;
    }

    /// @param _foodName, the name of the food
    /// @param _cal, the amount of calories of the food
    function _addFoodItem(string memory _foodName, uint _cal) private {
        bytes memory _foodNameB = bytes(_foodName);
        require(_foodNameB.length > 1, "Did not receive the name of the food");
        require(_cal > 0, "Did not receive the calorie of the food");
        uint _dateReg = now;
        FoodItem memory foodItem = FoodItem(msg.sender,_foodName, _cal, _dateReg, foodItemLength());
        uint id = foodItems.push(foodItem) - 1;
        foodItemMap[msg.sender] = foodItem;
        foodToOwner[id] = msg.sender;
        ownerFoodItemCount[msg.sender] = ownerFoodItemCount[msg.sender].add(1);
        (uint year, uint month, uint day) = timestampToDate(_dateReg);
        bytes32 dateFormatedToBytes = keccak256(abi.encodePacked(year + month + day));
        totalCaloriesByDate[dateFormatedToBytes] += _cal;
        totalCal += _cal;
        eatenCal += _cal;
        emit NewFoodItem("New Food item added", id, _foodName, _cal);
    }
    
    /// @return the amount of food items the user has
    function foodItemLength() public view returns(uint count) {
        return foodItems.length;
    }

    /// @dev public function for _addFoodItem
    function addFoodItem(string memory _foodName, uint _cal) public {
        _addFoodItem(_foodName, _cal);
    }

    /// @param _date, the date of the food when it was added
    /// @return the total calories that day was eaten
    function _getTotalCalEatenByDate(uint _date) private view returns (uint) {
        require(foodItems.length > 0, "You have no food item added");
        uint _totalCal = 0;
        (uint searchedYear, uint searchedMonth, uint searchedDay ) = timestampToDate(_date);
        bytes32 searchedDate = keccak256(abi.encodePacked(searchedYear + searchedMonth + searchedDay));
        _totalCal = totalCaloriesByDate[searchedDate];
        require(_totalCal > 0, "There were no foods added with this date");
        return _totalCal;
    }

    /// @dev public function for _getTotalCalEatenByDate
    function getTotalCalEatenByDate(uint year, uint month, uint day)public view returns (uint){
        uint unixTimeStamp = timestampFromDate(year,month,day);
        return _getTotalCalEatenByDate(unixTimeStamp);
    }

    /// @param _year, the year of the food when it was added
    /// @param _month, the year of the food when it was added
    /// @param _day, the year of the food when it was added
    /// @return the date from a unix timestamp
    /// @dev uses the BokkyPooBahsDateTimeLibrary to convert a timestamp to date
    function timestampFromDate(uint year, uint month, uint day) private pure returns (uint timestamp) {
        return BokkyPooBahsDateTimeLibrary.timestampFromDate(year, month, day);
    }

    /// @param timestamp, UNIX timestamp
    function timestampToDate(uint timestamp) private pure returns (uint year, uint month, uint day) {
        (year, month, day) = BokkyPooBahsDateTimeLibrary.timestampToDate(timestamp);
    }

    /// @param _cal, amount of calories the user has burned
    function burnCal(uint _cal) public {
        burnedCal += _cal;
        totalCal -= _cal;
        emit calorieBurned("We burned some calories", _cal);
    }

    function getContractBalance() public view returns (uint){
        require(whitelist.isMember(msg.sender), "Account is niet geautoriseerd.");
        return address(this).balance;
    }

    /// @param _owner, address of the user
    /// @return get all the id's of the food items of the user
    function getFoodItemFromOwner(address _owner) external view returns  (uint[] memory){
        uint[] memory result = new uint[](ownerFoodItemCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < foodItems.length; i++) {
          if (foodToOwner[i] == _owner) {
            result[counter] = i;
            counter++;
          }
        }
        return result;
    }
    
    function stopContract() public onlyAuthorized {
        isStopped = true;
    }
    
    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }
    
    function payOutUser() public payable stoppedInEmergency{
         /*
     The idea is that a user will get tokens based on his burned calories - eaten calories that is over the daily limit.
     For example, John has daily limit of 1900 calories he can eat per day. He burns 400 calories that day and is still
     within his limit of 1900 calories, he will get paid 400 calorie tokens. But if John ate 2100 calories and burned 400,
     he would only get 200 calorie tokens.

     This is still a idea in progress.
    */
    }
    
    function destroyContract() public onlyAuthorized {
        selfdestruct(msg.sender);
    }   
}