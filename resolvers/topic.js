module.exports = {
    Query:{
        topics:async(parent, args, {models})=>{
            return await models.Topic.find({});
        },
        topic:async(parent, {id}, {models})=>{
            return await models.Topic.findById(id);
        }
    },
    Mutation:{
        createTopic:async(parent, {name}, {models, me})=>{
            let newtopic = new models.Topic({
                name,
                by:me.id,
            });
            return await newtopic.save();
        },
        deleteTopic:async(parent, {id}, {models})=>{
            return await models.Topic.findOneAndDelete(id);
        },
    },
    Topic:{
        subTopics:async(topic, args, {models})=>{
            return await models.Topic.find({_id:topic.subTopics})
        },
        by:async(topic, args, {models})=>{
            return await models.User.findById(topic.by);
        }
    }
}