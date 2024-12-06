const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {userSchema} = require('../utils/zodValidator');
const {generateToken} = require('../middlewares/authMiddleware');

const signUp = async (req,res) => {
    try{
        const parsed = userSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json(
                {
                    message: parsed.error.errors[0].message
                }
            );
        }
        const {username,email,password,role} = parsed.data;

        const existingUser = await User.findOne({
            where:{
                username
            }
        });

        if(existingUser){
            return res.status(400).json(
                {
                    message: 'Username already exists'
                }
            )
        };
        const hashedPassword = await bcrypt.hashSync(password,10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        const token = generateToken(user.id,user.role);
        return res.status(201).json(
            {
                message: 'User created successfully',
                token
            }
        );
    }
    catch(err){
        console.error(err);
        return res.status(500).json(
            {
                
                message: 'Internal Server Error1'
            }
        );
    }
       
}

const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({
            where:{
                email
            }
        });

        if(!user){
            return res.status(400).json(
                {
                    message: 'Invalid email or password'
                }
            );
        }

        const isMatch = bcrypt.compareSync(password,user.password);
        if(!isMatch){
            return res.status(400).json(
                {
                    message: 'Invalid password'
                }
            );
        }
        const token = generateToken(user.id,user.role);
        console.log({user,token});
        return res.status(200).json(
            {
                message: 'Login Successful',
                token
            }
        );


    }
    catch(err){
        return res.status(500).json(
            {
                message: 'Internal Server Error'
            }
        );
    }
}

module.exports = {signUp,login};