module.exports = {
    Query:{
        allgroups:async(parent, args, {models})=>{
            return await models.Group.find({});
        },
        groups:async(parent, args, {models,me})=>{
            if(me){
                return await models.Group.findGroups(me.id);
            }
            return null;
        },
        group:async(parent, {id}, {models, me})=>{
           let group =  await models.Group.findById(id);
           if(!group){
               return null;
           }
           const isMember = group.members.includes(me.id);
           const isAdmin = group.admin.includes(me.id)
           if(isMember || isAdmin){
               return group;
           }
           return null;
        }
    },
    Mutation:{
        createGroup:async(parent, { members, name}, {models, me})=>{
            let newgroup = new models.Group({
                admin:me.id,
                members,
                name,
            });
            return await newgroup.save();
        },
        addMember:async(parent, {memberId, groupId}, {models})=>{
            let group = await models.Group.findById(groupId);
            return await models.Group.update({$push:{members:memberId}})
        }
    },
    Group:{
        admin:async(group, args, {models})=>{
            return await models.User.findById(group.admin);
        },
        members:async(group, args, {models})=>{
            return await models.User.find({_id:group.members});
        }
    }
}