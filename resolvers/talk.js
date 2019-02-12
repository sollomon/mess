const {EVENTS, pubsub} = require('../subscription');

module.exports = {
    Query:{
        talks:async(parent, {id}, {models})=>{
            return await models.Talk.find({groupId:id})
        },
        talk:async(parent, {id},{models})=>{
            return await models.Talk.findById(id);
        },
    },
    Mutation:{
        createTalk:async(parent, {groupId, content}, {models, me})=>{
            let newtalk = new models.Talk({
                groupId,
                by:me.id,
                content,
            });
            const talk =  await newtalk.save();
            pubsub.publish(EVENTS.TALK.CREATED,{
                talkCreated:{talk},
            });
            return talk;
        }
    },
    Talk:{
        group:async(talk, args, {models})=>{
            return await models.Group.findById(talk.groupId);
        },
        by:async(talk, args, {models})=>{
            return await models.User.findById(talk.by);
        }
    },
    Subscription:{
        talkCreated:{
            subscribe:()=>pubsub.asyncIterator(EVENTS.TALK.CREATED),
        },
    },
};