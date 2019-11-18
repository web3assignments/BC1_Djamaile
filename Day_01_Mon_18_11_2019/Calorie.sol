pragma solidity ^0.5.11;


contract CalorieMoney {
    event NewFoodItem(uint id, string foodName, uint cal);
    uint private totalCal;

    struct FoodItem {
        string foodName;
        uint cal;
        string dateReg;
    }

    FoodItem[] internal foodItems;


    function _addFoodItem(string memory _foodName, uint _cal, string memory _dateReg) private {
        uint id = foodItems.push(FoodItem(_foodName, _cal, _dateReg)) - 1;
        totalCal += _cal;
        emit NewFoodItem(id, _foodName, _cal);
    }

    function addFoodItem(string memory _foodName, uint _cal, string memory _dateReg) public {
        _addFoodItem(_foodName, _cal, _dateReg);
    }

    function _getTotalCalByDate(string memory _date) private view returns (uint) {
        uint _totalCal = 0;
        for(uint i = 0; i < foodItems.length; i++){
            if(keccak256(abi.encodePacked(foodItems[i].dateReg)) == keccak256(abi.encodePacked(_date))){
                _totalCal += foodItems[i].cal;
            }
        }
        return _totalCal;
    }

    function getTotalCalByDate(string memory _dateReg)public view returns (uint){
        return _getTotalCalByDate(_dateReg);
    }

    function burnCal(uint _cal) public {
        totalCal -= _cal;
    }

    function getTotalCal() public view returns (uint){
        return totalCal;
    }
}