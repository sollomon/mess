const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        allworks:[Work!]
        works(ids:[ID!]):[Work!]
        work(id:ID!):Work
        myWork:[Work!]
    }
    extend type Mutation{
        createWork(ref:ID!, shop:ID!, role:[String]):Work!
    }
    type Work{
        id:ID!
        ref:User!
        shop:Shop!
        role:[String!]
        access:[String!]
    }
`