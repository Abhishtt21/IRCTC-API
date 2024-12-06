const {jsonwebtoken} = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (id,role) => {
    return jwt.sign({id,role},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

const authenticateUser = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json(
                {
                    message: 'You are not logged in. Please login to get access'
                }
            );
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const currentUser = await User.findByPk(decoded.id);
        if(!currentUser){
            return res.status(401).json(
                {
                    message: 'Invalid token. User not found'
                }
            );
        }
        req.user = currentUser;
        next();

    }
    catch(err){
        return res.status(401).json(
            {
                message: 'Invalid token. Please login again'
            }
        );
    }
}

module.exports = {generateToken,authenticateUser};