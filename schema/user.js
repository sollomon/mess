const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query{
        allusers:[Contact!]
        user(id:ID!):User!
        users(ids:[ID!]):[User!]
        me:User
    }

    extend type Mutation{
        createUser(fName:String!, lName:String!, password:String!, username:String!, email:String!, phone:String!):User!
        signIn(email:String!,password:String!):Token!
    }

    type Token{
        token:String!
    }
    type User{
        id:ID!
        fName:String!
        lName:String!
        username:String!
        email:String!
        phone:String!
        photo:Photo
    }
`