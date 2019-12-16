export default function validate(values, activeStep) {
    let errors = {};
    if(!values.fooditem){
        errors.fooditemError = "error";
        values.fooditemHelp = "Please fill in something";
    }else{
        errors.fooditemError = "success";
    }
    return errors;
}