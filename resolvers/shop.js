module.exports = {
    Query:{
        allshops:async(parent, args, {models})=>{
            return await models.Shop.find({});
        },
        shops:async(parent, {ids}, {models})=>{
            return await models.Shop.find({_id:{$in:ids}});
        },
        shop:async(parent, {id}, {models})=>{
            return await models.Shop.findById(id);
        },
        myShops:async(parent, args, {models, me})=>{
            return await models.Shop.find({admin:me.id});
        }
    },
    Mutation:{
        createShop:async(parent, {name, username, email, phone}, {models, me})=>{
            let newshop = new models.Shop({
                admin:me.id,
                name,
                username,
                email,
                phone
            });
            const shop =  await newshop.save();
            let adminwork = new models.Work({
                ref:me.id,
                shop:shop.id,
                role:'ADMIN',
                by:me.id
            });
            adminwork.save();
            return shop;
        },
    },
    Shop:{
        admin:async(shop, args, {models})=>{
            return await models.User.findById(shop.admin);
        },
        goods:async(shop, args, {models})=>{
            return await models.Good.find({_id:shop.goods})
        }
    }
}