const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username : { type: String, required: true },
    email : { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    plan: { type: String, enum: ['free', 'premium'], default: 'free' },
    mapCount: { type: Number, default: 5 },
    paystackCustomerCode : { type: String, unique: true, sparse: true}
}, {
    timestamps: true
})

// a middleware of mongoose to ensure secure user
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }

    // hash the password 
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

// method to compare entered password with hash password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema)
module.exports = User;