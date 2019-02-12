const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
    return [salt, hash].join('$');
}

const createToken =async (user, secret, expiresIn) =>{
    const {id, fName, lName, username}= user;
    return await jwt.sign({id, fName, lName, username}, secret, {expiresIn});
};

module.exports = {
    Query:{
        allusers:async(parent, args, {models,me})=>{
            if(me){
                let usercontacts=  await models.User.find({});
                let shopcontacts = await models.Shop.find({});
                return usercontacts.concat(shopcontacts);
            }
            return null
        },
        users:async(parent, {ids}, {models, me})=>{
            if(me){
                return await models.User.find({_ids:{$in:ids}});
            }
            return null;
        },
        user:async(parent, {id}, {models, me})=>{
            if(me){
                return await models.User.findById(id);
            }
            return null;
        },
        me:async(parent, args, {models, me})=>{
            if(!me){
                return null;
            }
            return await models.User.findById(me.id)
        }
    },
    Mutation:{
        createUser:async(parent, {fName, lName, password, username, email, phone}, {models})=>{
            let newuser = new models.User({
                fName,
                lName,
                password:hashPassword(password),
                username,
                email,
                phone,
            });
            return await newuser.save();
        },
        signIn:async(parent, {email,password}, {models, secret})=>{
            const user = await models.User.findOne({email:email});
            if(!user){
                throw new UserInputError("No User Found")
            }
            const isValid = await models.User.verifyHash(password, user.password);

            if(!isValid){
                throw AuthenticationError('Invalid Password');
            }
            return {token:createToken(user, secret, '3h')}
        }
    },
    User:{
        photo:async(user , args, {models})=>{
            return await models.Photo.findOne({ref:user.id,type:'Profile'});
        }
    }
}