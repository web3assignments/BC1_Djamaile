export default function validate(values) {
    let errors = {};
    if(!values.burn){
        errors.burnError = "error";
        values.burnErrorHelp = "Please fill in something";
    }

    return errors;
}