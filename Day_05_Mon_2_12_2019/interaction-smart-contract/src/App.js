import React, { useEffect, useState, Fragment } from "react";
import Web3 from "web3";
import { ABI } from "./utils/abi";
import { FoodCard } from "./components/card";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';



const Test = () => {
  const [totalcal, setTotalcal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [userAddress, setUserAddress] = useState();
  const web3 = new Web3(Web3.givenProvider);
  let ethereum = window.ethereum;


  const contractAddress = "0x3047d2B9900F754f543773d3a4fEADc18bD57628";
  let createdContract = new web3.eth.Contract(ABI, contractAddress);

  useEffect(() => {
    
    async function loadData() {
      const currentAddress = await web3.eth.getAccounts();
      setUserAddress(currentAddress[0]);

      const foodItemsIds = await getFoodItemsOfOwner(currentAddress[0]);
      await displayFoodItems(foodItemsIds);

      const cal = await getTotalCal();
      setTotalcal(cal);
    }

    loadData();
  }, [totalcal]);

  async function addFoodItem(naam, cal) {
    setLoading(true);
    await createdContract.methods.addFoodItem(naam, cal).send({
      from: userAddress,
      gas: 3000000
    }).catch(e => { console.log(e) });

    const totalCal = await getTotalCal();
    setTotalcal(totalCal);
    setLoading(false);
  }

  async function getTotalCal() {
    return await createdContract.methods.totalCal().call();
  }

  async function getFoodItemDetail(id) {
    return await createdContract.methods.foodItems(id).call().catch(e => { console.log(e) });
  }

  async function getFoodItemsOfOwner(address) {
    return await createdContract.methods.getFoodItemFromOwner(address).call();
  }

  async function displayFoodItems(ids) {
    setFoodItems([]);
    ids.map(async id => {
      const foodItem = await getFoodItemDetail(id);
      setFoodItems(prevState => prevState.concat([
        {
          id: foodItem.id,
          foodName: foodItem.foodName,
          calorie: foodItem.cal,
          date: foodItem.dateReg
        }
      ]));
    });
  }

  if (totalcal === 0) {
    return <p>Loading...</p>
  }


  return (
    <Fragment>
      {loading !== true ? <button onClick={() => addFoodItem("Delicious food 3", 100)}>Add Food</button> : <p>sending transaction..</p>}
      {foodItems.length <= 0 ?
      <Fragment>
         <p>No food items added yet</p>
      </Fragment>        
        :
        <Fragment>
          <CssBaseline />
          <Container fixed>
            <p>
              Total Calories: {totalcal}
            </p>
            <Grid container spacing={3}>
              {foodItems.map((food, index) => (
                <Fragment key={index}>
                  <Grid item xs={4}>
                    <FoodCard food={food.foodName} calorie={food.calorie} date={food.date} />
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

export default Test;