const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required: true},
    password:{type:String, required: true},
    role:{type:String, enum:["admin", "manager", "staff"], required:true}
});

//Hash password before saving
UserSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();

});

const User = mongoose.model('User', UserSchema);
module.exports = User;