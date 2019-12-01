import React, { useEffect, useState, Fragment } from "react";
import Web3 from "web3";
import { ABI } from "./utils/abi";
import { FoodCard } from "./components/card";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

const web3 = new Web3("https://ropsten.infura.io/v3/7e3a6f6883144efd87a1788b11d9a3f2");

const Test = () => {
  const [totalcal, setTotalcal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const privateKey = 'e0f3440344e4814d0dea8a65c1b9c488bab4295571c72fb879f5c29c8c861937';
  const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  const defaultAccount = web3.eth.defaultAccount;
  const contractAddress = "0x3005Ae07212edAab1c5f69D40531A55D6e2f8a46";
  let createdContract = new web3.eth.Contract(ABI, contractAddress);

  useEffect(() => {

    async function loadData() {
      const foodItemsIds = await getFoodItemsOfOwner(defaultAccount);
      await displayFoodItems(foodItemsIds);

      const cal = await getTotalCal();
      setTotalcal(cal);
    }

    loadData();
  }, [totalcal]);

  async function addFoodItem(naam, cal) {
    setLoading(true);
    await createdContract.methods.addFoodItem(naam, cal).send({
      from: web3.eth.defaultAccount,
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

  if (foodItems.length <= 0) {
    return <p>No food itens</p>;
  }

  return (
    <Fragment>
      {loading !== true ? <button onClick={() => addFoodItem("Delicious food 3", 100)}>AddFoodITem</button> : <p>sending transaction..</p>}
      <p>
        Total Calories: {totalcal}
      </p>
      {foodItems.length <= 0 ?
        <p>No food items added yet</p>
        :
        <Fragment>
          <CssBaseline />
          <Container fixed>
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