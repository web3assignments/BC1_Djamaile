pragma solidity ^0.5.11;

import "./BokkyPooBahsDateTimeLibrary.sol";

contract Calorie {
    event NewFoodItem(string message, uint id, string foodName, uint cal);
    event calorieBurned(string message, uint cal);
    event checkedCalByDate(string message, uint dateSearched);

    uint public eatenCal;
    uint public burnedCal;
    uint public totalCal = eatenCal - burnedCal;

    struct FoodItem {
        address User;
        string foodName;
        uint cal;
        uint dateReg;
    }

    FoodItem[] internal foodItems;
    mapping(address => FoodItem) foodItemMap;
    mapping(bytes32 => uint) totalCaloriesByDate;

    function _addFoodItem(string memory _foodName, uint _cal) private {
        bytes memory _foodNameB = bytes(_foodName);

        require(_foodNameB.length > 1, "Did not receive the name of the food");
        require(_cal > 0, "Did not receive the calorie of the food");

        uint _dateReg = now;
        FoodItem memory foodItem = FoodItem(msg.sender,_foodName, _cal, _dateReg);
        uint id = foodItems.push(foodItem) - 1;
        foodItemMap[msg.sender] = foodItem;
        (uint year, uint month, uint day) = timestampToDate(_dateReg);
        bytes32 dateFormatedToBytes = keccak256(abi.encodePacked(year + month + day));
        totalCaloriesByDate[dateFormatedToBytes] += _cal;
        totalCal += _cal;
        eatenCal += _cal;
        emit NewFoodItem("New Food item added", id, _foodName, _cal);
    }

    function addFoodItem(string memory _foodName, uint _cal) public {
        _addFoodItem(_foodName, _cal);
    }


    function _getTotalCalEatenByDate(uint _date) private view returns (uint) {
        require(foodItems.length > 0, "You have no food item added");
        uint _totalCal = 0;
        (uint searchedYear, uint searchedMonth, uint searchedDay ) = timestampToDate(_date);
        bytes32 searchedDate = keccak256(abi.encodePacked(searchedYear + searchedMonth + searchedDay));
        _totalCal = totalCaloriesByDate[searchedDate];
        require(_totalCal > 0, "There were no foods added with this date");
        return _totalCal;
    }

    function getTotalCalEatenByDate(uint year, uint month, uint day)public view returns (uint){
        uint unixTimeStamp = timestampFromDate(year,month,day);
        return _getTotalCalEatenByDate(unixTimeStamp);
    }

    function timestampFromDate(uint year, uint month, uint day) private pure returns (uint timestamp) {
        return BokkyPooBahsDateTimeLibrary.timestampFromDate(year, month, day);
    }

    function timestampToDate(uint timestamp) private pure returns (uint year, uint month, uint day) {
        (year, month, day) = BokkyPooBahsDateTimeLibrary.timestampToDate(timestamp);
    }

    function burnCal(uint _cal) public {
        burnedCal += _cal;
        totalCal -= _cal;
        emit calorieBurned("We burned some calories", _cal);
    }

    function getFoodItemFromUser() public view returns (address, string memory, uint, uint){
        require(foodItemMap[msg.sender].cal > 1, "User does not exit in our program");
        FoodItem memory item = foodItemMap[msg.sender];
        return (item.User, item.foodName, item.cal, item.dateReg);
    }
}