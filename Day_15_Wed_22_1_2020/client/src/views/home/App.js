import React, { useEffect, useState, Fragment } from "react";
import Web3 from "web3";
import { ABI } from "../../utils/abi";
import { FoodCard } from "../../components/card";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Healty from "../../images/heal-2.jpg";
import Fast from "../../images/fast_food.jpeg";
import Drink from "../../images/drink.jpg";


const App = () => {
  const [totalcal, setTotalcal] = useState(0);
  const [foodItems, setFoodItems] = useState([]);
  const [userAddress, setUserAddress] = useState();
  const [overLimit, setOverLimit] = useState(false);
  const [burnedCal, setBurnedCal] = useState(0);
  const web3 = new Web3(Web3.givenProvider);
  let ethereum = window.ethereum;
  let createdContract = new web3.eth.Contract(ABI, process.env.REACT_APP_CONTRACT);

  useEffect(() => {
    async function loadData() {
      const currentAddress = await web3.eth.getAccounts();
      setUserAddress(currentAddress[0]);
      console.log(currentAddress[0]);
      const foodItemsIds = await getFoodItemsOfOwner(currentAddress[0]);
      if (!foodItemsIds) {
        return;
      }
      const isOver = await userIsOverDailyLimit();
      const burned = await getBurnedCalories();
      setBurnedCal(burned);
      setOverLimit(isOver);
      await displayFoodItems(foodItemsIds);
    }

    loadData();
  }, [totalcal]);


  function getTotalCal() {
    const allCal = foodItems.map(f => parseInt(f.calorie));
    if (allCal.length <= 1) {
      return allCal[0];
    }
    const sumCal = allCal.reduce((a, b) => (a + b));
    return sumCal;
  }

  async function getFoodItemDetail(id) {
    return await createdContract.methods.foodItems(id).call().catch(e => { console.log(e) });
  }

  async function getFoodItemsOfOwner(address) {
    return await createdContract.methods.getFoodItemFromOwner(address).call();
  }

  async function getBurnedCalories(){
    return await createdContract.methods.burnedCal().call();
  }

  async function userIsOverDailyLimit(){
    let date = new Date();
    const year = date.getYear() + 1900;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return await createdContract.methods.isOverDailyLimit(year,month,day).call();
  }

  async function displayFoodItems(ids) {
    setFoodItems([]);
    async function addFoodItem() {
      ids.map(async id => {
        const foodItem = await getFoodItemDetail(id);
        const foodObjectToAdd = [
          {
            id: foodItem.id,
            foodName: foodItem.foodName,
            calorie: foodItem.cal,
            date: foodItem.dateReg,
            typeFood: foodItem.typeFood
          }
        ];
        setFoodItems(prevState => prevState.concat(foodObjectToAdd));
      });
    }
    await addFoodItem();
  }

  const renderFoodItem = food => {
    if (food.typeFood.toLowerCase() === "fast food") {
      return <FoodCard
        foodName={food.foodName}
        calorie={food.calorie}
        date={food.date}
        loading={false}
        image={Fast}
      />;
    }else if(food.typeFood.toLowerCase() === "drink"){
      return <FoodCard
        foodName={food.foodName}
        calorie={food.calorie}
        date={food.date}
        loading={false}
        image={Drink}
      />;
    }else{
      return <FoodCard
        foodName={food.foodName}
        calorie={food.calorie}
        date={food.date}
        loading={false}
        image={Healty}
      />;
    }
  }

  return (
    <Fragment>
      {foodItems.length <= 0 ?
        <Fragment>
          <CssBaseline />
          <Container fixed>
            <p>Can't find food items.</p>
          </Container>
        </Fragment>
        :
        <Fragment>
          <CssBaseline />
          <Container fixed>
            <p>
              Total Calories eaten: {getTotalCal()} <br/>
              Total Calories burned: {burnedCal}
            </p>
            {overLimit ? <p> User is over the daily limit of 1900 calories. Please workout!</p> : <p>Not over the daily limit!</p>}

            <Grid container spacing={3}>
              {foodItems.map((food, index) => (
                <Fragment key={index}>
                  <Grid item xs={4}>
                    {renderFoodItem(food)}
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </Container>
        </Fragment>
      }
    </Fragment>
  );
}

export default App;