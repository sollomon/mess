const {gql} = require('apollo-server-express');

module.exports=gql`
    extend type Query{
        allchats:[Chat!]
        chats:[Chat!]
        chat(id:ID!):Chat
    }

    extend type Mutation{
        createChat(second:ID!):Chat!
        deleteChat(id:ID!):Boolean!
    }
    type Contact{
        id:ID!
        username:String!
    }
    type Chat{
        id:ID!
        start:Contact!
        second:Contact!
    }
`