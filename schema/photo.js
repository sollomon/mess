const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        photo(id:ID!):Photo!
    }

    type Photo{
        id:ID!
        url:String!
        desc:String!
        ref:String!
        type:String!
    }
`