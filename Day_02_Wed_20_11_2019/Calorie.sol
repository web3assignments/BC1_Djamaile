pragma solidity ^0.5.11;


contract CalorieMoney {
    event NewFoodItem(string message, uint id, string foodName, uint cal);
    event calorieBurned(string message, uint cal);
    event checkedCalByDate(string message, string dateSearched);

    uint private eatenCal;
    uint private burnedCal;
    uint private totalCal = eatenCal - burnedCal;

    struct FoodItem {
        address User;
        string foodName;
        uint cal;
        string dateReg;
    }

    FoodItem[] internal foodItems;
    mapping(address => FoodItem) foodItemMap;

    function _addFoodItem(address user, string memory _foodName, uint _cal, string memory _dateReg) private {
        FoodItem memory foodItem = FoodItem(user,_foodName, _cal, _dateReg);
        uint id = foodItems.push(foodItem) - 1;
        foodItemMap[user] = foodItem;
        totalCal += _cal;
        eatenCal += _cal;
        emit NewFoodItem("New Food item added", id, _foodName, _cal);
    }

    function addFoodItem(address user, string memory _foodName, uint _cal, string memory _dateReg) public {
        _addFoodItem(user, _foodName, _cal, _dateReg);
    }


    function _getTotalCalByDate(string memory _date) private view returns (uint) {
        require(foodItems.length > 0, "You have no food item added");
        uint _totalCal = 0;
        for(uint i = 0; i < foodItems.length; i++){
            if(keccak256(abi.encodePacked(foodItems[i].dateReg)) == keccak256(abi.encodePacked(_date))){
                _totalCal += foodItems[i].cal;
            }
        }
        require(_totalCal > 0, "There were no foods added with this date");
        return _totalCal;
    }

    function getTotalCalByDate(string memory _dateReg)public view returns (uint){
        return _getTotalCalByDate(_dateReg);
    }

    function burnCal(uint _cal) public {
        burnedCal += _cal;
        totalCal -= _cal;
        emit calorieBurned("We burned some calories", _cal);
    }

    function getBurnedCal() public view returns (uint) {
        return burnedCal;
    }

     function getEatenCal() public view returns (uint) {
        return eatenCal;
    }

    function getTotalCal() public view returns (uint){
        require(totalCal != 0, "You haven't burned or added any calories");
        return totalCal;
    }

    function getFoodItemFromUser(address user) public view returns (address, string memory, uint, string memory){
        FoodItem memory item = foodItemMap[user];
        return (item.User, item.foodName, item.cal, item.dateReg);
    }
}