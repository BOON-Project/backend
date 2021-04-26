//errors are important! 
// why ? because an *error* let us know what do we have to change

const customError = (message, status = 400)=>{
    let error = new Error(message);
    error.status = status;
    return error;
}

module.exports = customError;