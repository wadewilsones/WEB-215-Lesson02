import User from '../models/user.model'
import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler'


/*Create a user*/

const create = async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save(); // attempts to save the user in the DB after mongoose validation
        return res.status(200).json({
            message:"Successfully signed up!"
        })
    }
    catch(err){
       return res.status(400).json({
           error:errorHandler.getErrorMessage(err)
       })    
    }
}


/*List all users*/

const list = async (req,res) => {
    try{
        let users = await User.find().select('name email updated created');
        res.json(users)
    }
    catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}
const userByID = async (req,res,next,id) => {
    try{
        let user = await User.findById(id);
        if(!user)
        return res.status('400').json({
            error:'user not found'
        })
        req.profile = user;
        next(); // propagate control to the next relevant controller function

    }
    catch(err){
        return res.status('400').json({
            error:"Could not retrieve user"
        })
    }
}
const read = (req,res) => {
    req.profile.hashed_password = undefined; // remove sensitive info
    req.profile.salt = undefined; // remove sensitive info
    return res.json(req.profile)
}
const update = async (req,res) => {
    try{
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        res.json(user)
    }
    catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req,res) => {
    try{
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser)
    }
    catch(err){
        return res.satus(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, userByID, read, list, remove,update }