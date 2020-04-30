const constants = require('../constants');
const jwt = require('jsonwebtoken');

module.exports.validateToken = (req, res, next) => {
    let response = {...constants.defaultServerResponse };
    try{
        if (!req.headers.authorization){
            throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
        }
        // console.log(req.headers.authorization.split('Bearer')[1].trim());
        const token = req.headers.authorization.split('Bearer')[1].trim();
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my_secret_key');
        req.userId = decoded.id;
        console.log('decoded', decoded);
        return next();
    }
    catch(error){
        console.log('Error', error);
        response.message = error.message;
        response.status = 401;
    }
    return res.status(response.status).send(response);
}