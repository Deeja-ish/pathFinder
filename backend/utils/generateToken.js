const jwt = require('jsonwebtoken')

const generateToken = (res, userId) =>{
    const token = jwt.sign(
        { userId: userId },
        process.env.JWT_SECRET,
        {expiresIn : "30d"}
    );

    return token
};

module.exports = generateToken;
