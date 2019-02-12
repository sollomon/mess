const {gql} = require('apollo-server-express');

module.exports=gql`
    extend type Query{
        topics:[Topic!]
        topic(id:ID!):Topic!
    }
    extend type Mutation{
        createTopic(name:String!):Topic!
        deleteTopic(id:ID!):Boolean!
    }
    type Topic{
        id:ID!
        name:String!
        subTopics:[Topic!]
        by:User!
    }
`