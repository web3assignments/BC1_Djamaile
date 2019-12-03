import React, { useEffect, useState, Fragment } from "react";
import Web3 from "web3";
import { ABI } from "../../utils/abi";
import { FoodCard } from "../../components/card";
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
    }

    loadData();
  }, [totalcal]);

  async function addFoodItem(naam, cal) {
    setLoading(true);
    await createdContract.methods.addFoodItem(naam, cal).send({
      from: userAddress,
      gas: 3000000
    }).catch(e => { console.log(e) });

    const totalCal = getTotalCal();
    setTotalcal(totalCal);
    setLoading(false);
  }

  function getTotalCal() {
    const allCal = foodItems.map(f => parseInt(f.calorie));
    const sumCal = allCal.reduce((a, b) => (a + b));
    return sumCal;
  }

  async function getFoodItemDetail(id) {
    return await createdContract.methods.foodItems(id).call().catch(e => { console.log(e) });
  }

  async function getFoodItemsOfOwner(address) {
    return await createdContract.methods.getFoodItemFromOwner(address).call();
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
            date: foodItem.dateReg
          }
        ];
        setFoodItems(prevState => prevState.concat(foodObjectToAdd));
      });
    }
    await addFoodItem();
  }

  return (
    <Fragment>
      {loading !== true ? <button onClick={() => addFoodItem("Delicious food 3", 100)}>Add Food</button> : <p>sending transaction..</p>}
      {foodItems.length <= 0 ?
        <Fragment>
          <CssBaseline />
          <Container fixed>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                  <FoodCard loading={true} />
                </Grid>
            </Grid>
          </Container>
        </Fragment>
          :
        <Fragment>
            <CssBaseline />
            <Container fixed>
              <p>
                Total Calories: {getTotalCal()}
              </p>
              <Grid container spacing={3}>
                {foodItems.map((food, index) => (
                  <Fragment key={index}>
                    <Grid item xs={4}>
                      <FoodCard food={food.foodName} calorie={food.calorie} date={food.date} loading={false} />
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