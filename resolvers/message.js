const {pubsub, EVENTS} = require('../subscription');

module.exports = {
    Query:{
        messages:async(parent, {chatId}, {models})=>{
            return await models.Message.find({chatId:chatId});
        },
        message:async(parent, {id}, {models})=>{
            return await models.Message.findById(id);
        }
    },
    Mutation:{
        createMessage:async(parent, {content, chatId}, {models, me})=>{
            let newMessage = new models.Message({
                by:me.id,
                content,
                chatId,
            });
            const message =  await newMessage.save();
            pubsub.publish(EVENTS.MESSAGE.SENT,{
                messageSent:{message}
            });
            return message;
        },
        deleteMessage:async(parent, {id}, {models})=>{
            return await models.Message.findOneAndDelete(id);
        }
    },
    Message:{
        chat:async(message, args, {models})=>{
            return await models.Chat.findById(message.chatId);
        },
        by:async(message, args, {models})=>{
            return await models.User.findById(message.by)
        }
    },
    Subscription:{
        messageSent:{
            subscribe:()=>pubsub.asyncIterator(EVENTS.MESSAGE.SENT),
        }
    }
}