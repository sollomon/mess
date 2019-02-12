const {gql} = require('apollo-server-express');

module.exports=gql`
    extend type Query{
        opinions(topicId:ID!):[Opinion!]
        opinion(id:ID!):Opinion!
    }
    extend type Mutation{
        createOpinion(topicId:ID!, content:String!):Opinion!
        deleteOpinion(id:ID!):Boolean!
    }
    type Opinion{
        id:ID!
        content:String!
        by:User!
        topic:Topic!
    }
`