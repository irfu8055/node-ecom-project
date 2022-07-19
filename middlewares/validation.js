var validator = require('validator');

const userName = (txtData)=>{
    if(validator.isEmpty(txtData) || !validator.isLength(txtData,{min:2,max:50}) || !validator.isAlpha(txtData,'en-IN')){
        return true;
    }
    else{
        return false;
    }
}
const userEmail = (txtData)=>{

    return (validator.isEmpty(txtData) || !validator.isEmail(txtData))?true:false;
}
const userMobile = (txtData)=>{
    if(validator.isEmpty(txtData) || !validator.isMobilePhone(txtData,'en-IN')){
        return true;
    }
    else{
        return false;
    }
}
const userPassword = (txtData)=>{
    if(validator.isEmpty(txtData) || !validator.isAlphanumeric(txtData,'en-IN') || !validator.isLength(txtData , {min:4,max:12})){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    userName,
    userEmail, 
    userMobile,
    userPassword
}