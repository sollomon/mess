module.exports = {
    Query:{
        opinions:async(parent, {topicId}, {models})=>{
            return await models.Opinion.find({topic:topicId})
        },
        opinion:async(parent, {id}, {models})=>{
            return await models.Opinion.findById(id);
        }
    },
    Mutation:{
        createOpinion:async(parent, {topic, content}, {models, me})=>{
            let newOpinion = new models.Opinion({
                topic,
                by:me.id,
                content,
            });
            return await newOpinion.save();
        },
        deleteOpinion:async(parent, {id}, {models, me})=>{
            return await models.Opinion.findOneAndDelete(id)
        }
    },
    Opinion:{
        topic:async(opinion, args, {models})=>{
            return await models.Topic.findById(opinion.topic)
        },
        by:async(opinion, args, {models})=>{
            return await models.User.findById(opinion.by)
        }
    }
}