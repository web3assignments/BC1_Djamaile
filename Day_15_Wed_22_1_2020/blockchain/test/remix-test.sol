import "remix_tests.sol";
import "../contracts/Calorie.sol";

contract test3 {
   
    Calorie cal;
    function beforeAll () public {
       cal = new Calorie(msg.sender);
    }
    
    function checkFoodItemsLenght () public {
        Assert.equal(cal.foodItemLength(), uint(0), "There should be no food items");
    }
    
    function canAddFoodItem () public {
        cal.addFoodItem("Burger", 500);
        Assert.equal(cal.foodItemLength(), uint(1), "There should be one food item");
    }
    
    function dailyLimitCheck () public {
        Assert.equal(cal.dailyLimit(), uint(1900), "Daily limit is not right");
    } 
    
    function canBurnCal () public {
        cal.burnCal(200);
        Assert.equal(cal.burnedCal(), uint(200),"sd" );
    }
    
    function cannotAddWrongFoodItem() public {
        cal.addFoodItem("Tnmnmmj", 200);
        Assert.equal(cal.foodItemLength(), uint(0), "There should be one food item");
    }
}