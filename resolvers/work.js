module.exports = {
    Query:{
        allworks:async(parent, args, {models})=>{
            return await models.Work.find({});
        },
        works:async(parent, {ids}, {models})=>{
            return await models.Work.find({_id:{$in:ids}});
        },
        work:async(parent, {id}, {models, me})=>{
            if(!me){
                return null;
            }
            let work = await models.Work.findOne({ref:me.id,shop:id});
            if(!work){
                return null;
            }
            return work;
        },
        myWork:async(parent, args, {models, me})=>{
            if(me){
                return await models.Work.find({ref:me.id})
            }
            return null;
        }
    },
    Mutation:{
        createWork:async(parent, {ref, shop, role}, {models, me})=>{
            let newwork = new models.Work({
                ref,
                shop,
                role,
                by:me.id
            });
            return await newwork.save();
        },
    },
    Work:{
        ref:async(work, args, {models})=>{
            return await models.User.findById(work.ref);
        },
        shop:async(work, args, {models})=>{
            return await models.Shop.findById(work.shop);
        }
    }
}