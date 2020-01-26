import React, { Fragment, useState, useEffect } from "react"
import { Form, Input, Select, Icon } from 'antd';
import useForm from "./useForm";
import validate from "./validation";
import Web3 from "web3";
import { ABI } from "../../utils/abi";
import history from "../../utils/history";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};


const Burn = () => {
    const web3 = new Web3(Web3.givenProvider);
    let createdContract = new web3.eth.Contract(ABI, process.env.REACT_APP_CONTRACT);

    const {
        values,
        handleChange,
        handleSubmit,
        errors
    } = useForm(submit, validate);

    const [loading, setLoading] = useState(false);
    const [foodType, setFoodType] = useState("Fast food");
    const [address, setUserAddress] = useState("");

    useEffect(() => {
        async function loadUser() {
            const currentAddress = await web3.eth.getAccounts();
            setUserAddress(currentAddress[0]);
        }
        loadUser();
    }, [])

    async function submit() {
        setLoading(true);
        console.log(`${values.fooditem} : ${values.foodcal} : ${foodType}`)
        await createdContract.methods.burnCal(values.burn).send({
            from: address,
            gas: 3000000
        }).then(() => {
            setLoading(false);
            history.push("/");
        }).catch(e => { console.log(e) });
    }

    return (
        <Fragment>
            <Form {...formItemLayout}>
                <Form.Item
                    label="Burned calories:"
                    validateStatus={errors.burnError}
                    help={values.burnErrorHelp}
                >
                    <Input
                        placeholder="100"
                        id="error"
                        name="burn"
                        value={values.burn}
                        onChange={handleChange}
                    />
                </Form.Item>
            </Form>
            {loading ? <p>Please confirm transaction...</p> : null}
            <button onClick={() => handleSubmit()}>Submit</button>
        </Fragment>
    );
}

export default Burn;