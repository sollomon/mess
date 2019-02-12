const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        talks(id:ID!):[Talk!]
        talk(id:ID!):Talk!
    }
    extend type Mutation{
        createTalk(groupId:ID!, content:String!):Talk!
    }
    type Talk{
        id:ID!
        group:Group!
        content:String!
        by:User!
    }

    extend type Subscription{
        talkCreated:TalkCreated!
    }
    type TalkCreated{
        talk:Talk!
    }
`