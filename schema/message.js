const {gql} = require('apollo-server-express');

module.exports=gql`
    extend type Query{
        messages(chatId:ID!):[Message!]
        message:Message!
    }
    extend type Mutation{
        createMessage(content:String!, chatId:ID!):Message!
        deleteMessage(id:ID!):Boolean!
    }
    type Message{
        id:ID!
        content:String
        chat:Chat!
        by:User!
    }
    extend type Subscription{
        messageSent:MessageSent!
    }
    type MessageSent{
        message:Message!
    }
`