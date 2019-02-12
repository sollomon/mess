const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const topicSchema = new Schema({
    name:String,
    subTopics:[String],
    by:String,
},{timestamps:true});

const Topic = mongoose.model('Topic', topicSchema);

const opinionSchema = new Schema({
    topic:String,
    by:String,
    content:String,
},{timestamps:true});

const Opinion = mongoose.model('Opinion', opinionSchema);

const chatSchema = new Schema({
    start:String,
    second:String,
},{timestamps:true});

const Chat = mongoose.model('Chat', chatSchema);

Chat.findChats = async id =>{
    let startchats = await Chat.find({start:id});
    let secondChats  = await Chat.find({second:id})
    const chats = startchats.concat(secondChats);
    return chats;
};

Chat.findChat = async (me, id)=>{
    let chat = await Chat.find({start:id,second:me.id});
    if(!chat){
        chat = await Chat.find({start:me.id, second:id})
    }
    return chat[0];
}

const messageSchema = new Schema({
    chatId:String,
    by:String,
    content:String
},{timestamps:true})

const Message = mongoose.model('Message', messageSchema);

const groupSchema = new Schema({
    name:String,
    members:[String],
    admin:[String]
},{timestamps:true});

const Group =  mongoose.model('Group', groupSchema);

Group.findGroups = async id =>{
    let adminGroups = await Group.find({admin:id});
    let memberGroups = await Group.find({members:id});
    const groups = adminGroups.concat(memberGroups);
    return groups
}

const talkSchema = new Schema({
    groupId:String,
    by:String,
    content:String,
},{timestamps:true})

const Talk = mongoose.model('Talk', talkSchema);

//userschema
const userSchema = new Schema({
    fName:String,
    lName:String,
    password:String,
    username:String,
    shops:[String],
    email:String,
    phone:String,
    photo:String,
},{timestamps:true});

const User = mongoose.model('User', userSchema);

User.verifyHash = async (password, original)=>{
    const originalHash = original.split('$')[1];
    const salt = original.split('$')[0];
    const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');

    return await hash === originalHash

}

const shopSchema = new Schema({
    name:String,
    admin:String,
    branches:[String],
    username:String,
    subscribers:[String],
    contact:String,
    shops:[String],
    goods:[String],
    email:String,
    phone:String,
},{timestamps:true})

const Shop = mongoose.model('Shop', shopSchema);

const goodSchema = new Schema({
    name:String,
    desc:[String],
    category:[String],
},{timestamps:true});

const Good = mongoose.model('Good', goodSchema);

const workSchema = new Schema({
    ref:String,
    shop:String,
    role:[String],
    access:[String],
    by:String,
},{timestamps:true})

const Work = mongoose.model('Work', workSchema);

const categorySchema = new Schema({
    name:String,
    desc:[String],
    subCategories:[String],
});

const Category = mongoose.model('Category', categorySchema);

const photoSchema = new Schema({
    ref:String,
    type:String,
    url:String,
    desc:String,
},{timestamps:true});

const Photo = mongoose.model('Photo', photoSchema);


module.exports={
    Photo,
    Topic,
    Opinion,
    Chat,
    Message,
    Group,
    Talk,
    Work,
    User,
    Shop,
    Good,
    Category,
}