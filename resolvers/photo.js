module.exports = {
    Query:{
        photo:async(parent, {id}, {models})=>{
            return await models.Photo.findById(id);
        }
    }
}