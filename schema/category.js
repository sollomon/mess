const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        categories:[Category!]
        category(id:ID!):Category!
    }

    extend type Mutation{
        createCategory(name:String!):Category!
    }
    type Category{
        id:ID!
        name:String!
        subCategories:[Category!]
    }
`