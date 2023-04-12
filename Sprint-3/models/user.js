const mongoose = require('mongoose');// for mongo db
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');//for crytographic coding

const userSchema = new Schema({
    firstName:{type: String, required: [true, 'cannot be empty']},
    lastName:{type: String, required: [true, 'cannot be empty']},
    email:{type: String, required: [true, 'cannot be empty'], unique: true},
    password:{type: String, required: [true, 'cannot be empty']},
    profileId : {type:Schema.Types.ObjectId},
    biograph: {type: String}, 
    phoneNum: {type: String}, 
    image: {data: Buffer, contentType: String}  
});

//replace plaintext password with hashed-password before saving the document
//pre middleware to our user shema, cannot use arrow function
userSchema.pre('save', function(next){
    let user = this;// == who called the save function
    if(!user.isModified('password'))
        return next;
    bcrypt.hash(user.password, 10) //10 == saltRounds, higher is securer
    .then(hash => {
        user.password = hash;
        next()
    })
    .catch(err => next(err));
});
//implement a method to compare the email and password in the DB
userSchema.methods.comparePassword = function(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);