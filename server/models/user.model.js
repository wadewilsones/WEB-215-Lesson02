import mongoose from 'mongoose';
import crypto from 'crypto';


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: 'Name is required'
    },
    email:{
        type:String,
        trim:true,
        unique:'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required:'Email is required'
    },
    hashed_password:{
        type:String,
        required:"Password is required"
    },
    salt: String,
    created:{
        type:Date,
        default: Date.now
    },
    updated:Date
})

// Set up a virtual password

UserSchema
.virtual('password') // virtual proprty is NOT stored in DB, but in docs
.set(function(password){
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

//Password validation

UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if(this.isNew && !this._password){ //isNew - boolean flag specifying if the document is new.
        this.invalidate('password', 'Password is required')
    }
}, null)


//Method of our schema

UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    }, //verifying sign-in attempts by matching the user-provided password text with  hashed_password
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto // module of Node
            .createHmac('sha1', this.salt) // sha1 is a hashing algorithm and createHmac from crypto to generate the cryptograpthic HMAC hash from the password and salt
            .update(password)
            .digest('hex')
        }
        catch(err){
            return''
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }

}

export default mongoose.model('User', UserSchema)