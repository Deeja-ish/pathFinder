const User = require('../models/User')
const generateToken = require("../utils/generateToken")

// register user
const registerUser = async (req, res) => {
    const{ username, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email })
        if(userExist){
            return res.status(400).json({message : "User already exist" })
        };

        const user = await User.create({
            username,
            email,
            password
        })
        if(user){
            const token = generateToken(res, user._id)
            res.status(201).json({
                _id : user._id,
                username: user.username,
                email: user.email,
                plan: user.plan,
                token: token,
            });
        }else{
            res.status(400).json({message: "Invalid User"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error" });
    }
};

// check if user is loggedIn

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (user && await user.matchPassword(password)) {
            const token = generateToken(res, user._id);
            
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                plan: user.plan,
                token: token
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { registerUser, loginUser }