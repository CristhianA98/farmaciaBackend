const jwt = require("jsonwebtoken");

const generarJWT = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload,process.env.SECRET_OR_PRIVATE_KEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if(err){
                reject('Error al generar token');
            }else{
                resolve(token);
            }
        });

    });
}

module.exports = {
    generarJWT
}