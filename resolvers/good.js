module.exports = {
    Query:{
        goods:async(parent, args, {models})=>{
            return await models.Good.find({})
        },
        good:async(parent, {id}, {models})=>{
            return await models.Good.findById(id);
        }
    },
    Mutation:{
        createGood:async(parent, {name, shopId, desc, category}, {models})=>{
            let newgood = new models.Good({
                name,
                desc,
                category,
            });
            const good = await newgood.save();
            const shop = await models.Shop.findById(shopId);
            shop.update({$push:{goods:good.id}})
            return good;
        }
    },
    Good:{
        category:async(good, args, {models})=>{
            return await models.Category.find({_id:good.category});
        },
        shop:async(good, args, {models})=>{
            return await models.Shop.find({goods:good.id})
        }
    }
}