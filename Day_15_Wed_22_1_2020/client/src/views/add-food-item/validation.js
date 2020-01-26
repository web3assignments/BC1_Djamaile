export default function validate(values) {
    let errors = {};
    if(!values.fooditem){
        errors.fooditemError = "error";
        values.foodItemHelp = "Please fill in something";
    }
    if(!values.foodcal){
        errors.foodcalError = "error";
        values.foodcalHelp = "Please fill in something";
    }

    return errors;
}