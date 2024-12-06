const User = require('../models/userModel');

const adminMiddleware = async (req,res,next) => {
    try{
        const apiKey = req.headers['x-api-key'];
        if(!apiKey || apiKey !== process.env.ADMIN_API_KEY){
            return res.status(401).json(
                {
                    message: 'You are not authorized to access this route'
                }
            );
        }

        if(req.user.role !== 'admin'){
            return res.status(401).json(
                {
                    message: 'Admin Access Required'
                }
            );

        }
        next();
    }
    catch(err){
        return res.status(401).json(
            {
                message: 'You are not authorized to access this route'
            }
        );
    }
}

module.exports = adminMiddleware;