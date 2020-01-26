export const DefaultSelect = (url) => {
    switch(url){
        case "/add-food":
            return '2';
        case "/calorie-info":
            return '3';
        default:
            return '1';
    }
};

