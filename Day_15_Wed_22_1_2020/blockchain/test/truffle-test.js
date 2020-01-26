const Calorie = artifacts.require("Calorie");

contract('Calorie', function(){

    it("Daily limit should be 1900 calories", function(){
        return Calorie.deployed().then(function(instance){
          return instance.dailyLimit.call();
        }).then(function(dailyLimit){
          assert.equal(dailyLimit.valueOf(), 1900, "Daily limit is not right");
        });
      });

});