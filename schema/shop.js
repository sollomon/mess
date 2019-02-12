const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        allshops:[Shop!]
        shops(ids:[ID!]):[Shop!]
        shop(id:ID!):Shop
        myShops:[Shop!]
    }
    extend type Mutation{
        createShop(name:String!, username:String!, email:String!, phone:String!):Shop!
    }

    type Shop{
        id:ID!
        name:String!
        admin:User!
        username:String!
        email:String!
        phone:String!
        goods:[Good!]
    }
`