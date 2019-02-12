module.exports = {
    Query:{
        allchats:async(parent, args, {models})=>{
            return await models.Chat.find({});
        },
        chats:async(parent, args, {models, me})=>{
            return await models.Chat.findChats(me.id)
        },
        chat:async(parent, {id}, {models, me})=>{
            var chat = await models.Chat.findOne({start:id, second:me.id});
            if(!chat){
                var chat = await models.Chat.findOne({start:me.id, second:id});
            }
            return chat;
        },
    },
    Mutation:{
        createChat:async(parent, { second}, {models, me})=>{
            let newChat = new models.Chat({
                start:me.id,
                second,
            });
            return await newChat.save();
        },
        deleteChat:async(parent, {id}, {models})=>{
            return await models.Chat.findOneAndDelete(id);
        }
    },
    Chat:{
        start:async(chat, args, {models})=>{
            return await models.User.findById(chat.start);
        },
        second:async(chat, args, {models})=>{
            let contact =  await models.User.findById(chat.second);
            if(!contact){
                contact = await models.Shop.findById(chat.second);
            } 
            return contact;
        }
    }
}