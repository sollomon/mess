const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        allgroups:[Group!]
        groups:[Group!]
        group(id:ID!):Group
    }
    extend type Mutation{
        createGroup( members:[ID!], name:String!):Group!
        addMember(groupId:ID!, memberId:ID!):Group!
    }
    type Group{
        name:String!
        id:ID!
        admin:User!
        members:[User!]
    }
`