const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        goods:[Good!]
        good(id:ID!):Good
    }
    extend type Mutation{
        createGood(name:String!, desc:[String!], shopId:ID!, category:[ID!]):Good!
    }

    type Good{
        id:ID!
        name:String!
        desc:[String!]
        shop:[Shop!]
        category:[Category!]
    }
`