module.exports = {
    Query:{
        categories:async(parent, args, {models})=>{
            return await models.Category.find({});
        },
        category:async(parent, {id}, {models})=>{
            return await models.Category.findById(id);
        }

    },
    Mutation:{
        createCategory:async(parent, {name},{models})=>{
            let newcategory = new models.Category({
                name,
            });
            return await newcategory.save();
        }
    },
    Category:{
        subCategories:async(category, args, {models})=>{
            return await models.Category.find({_id:category.subCategories});
        }
    }
}