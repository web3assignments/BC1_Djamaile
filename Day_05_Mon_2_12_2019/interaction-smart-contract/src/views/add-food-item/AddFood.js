import React, {Fragment} from "react"
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Icon } from 'antd';
import useForm from "./useForm";
import validate from "./validation";
const { Option } = Select;


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


const AddFood = () => {

    const {
        values,
        handleChange,
        handleSubmit,
        errors
    } = useForm(submit, validate);

    function submit() {
        handleSubmit();
    }

    return (
        <Fragment>
            <Form {...formItemLayout}>
                <Form.Item
                    label="Food item name:"
                    validateStatus={errors.fooditemError}
                    help={values.foodItemHelp}
                >
                    <Input
                        prefix={<Icon type="user" style={{ color: '#70E4EF' }} />}
                        placeholder="Salad"
                        id="error"
                        name="fooditem"
                        value={values.fooditem}
                        onChange={handleChange}
                    />
                </Form.Item>

                <Form.Item
                    label="Calorie:"
                    validateStatus={null}
                    help=""
                >
                    <Input
                        prefix={<Icon type="smile" style={{ color: '#70E4EF' }} />}
                        placeholder="100" id="error"
                    />
                </Form.Item>


                <Form.Item label="Food Categorie:" hasFeedback validateStatus={null}>
                    <Select defaultValue="1">
                        <Option value="2">Fast Food</Option>
                        <Option value="3">Drink</Option>
                        <Option value="4">Healthy</Option>
                    </Select>
                </Form.Item>
            </Form>
            <button onClick={() => submit()}>Submit</button>
        </Fragment>
    );
}

export default AddFood;