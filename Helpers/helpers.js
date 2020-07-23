const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = (password)=>{
    const encriptada = bcrypt.hashSync(password, 10);
    console.log(encriptada);
    return encriptada;
}

helpers.matchPassword = function(password, savedPassword){
        const coinciden = bcrypt.compareSync(password, savedPassword);
        if(coinciden){
            return coinciden;
        }
    }

module.exports = helpers;