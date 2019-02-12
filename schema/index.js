const {gql} = require('apollo-server-express');

const messageSchema = require('./message');
const chatSchema = require('./chat');
const topicSchema = require('./topic');
const opinionSchema = require('./opinion');
const talkSchema = require('./talk');
const groupSchema = require('./group');
const photoSchema = require('./photo');

//user
const shopSchema = require('./shop');
const userSchema = require('./user');
const workSchema = require('./work');

//goods
const goodSchema = require('./good');
const categorySchema = require('./category');

const linkSchema = gql`
    scalar Date

    type Query{
        _:Boolean
    }

    type Mutation{
        _:Boolean
    }

    type Subscription{
        _:Boolean
    }
`;

module.exports=[
    linkSchema,
    messageSchema,
    chatSchema,
    topicSchema,
    opinionSchema,
    talkSchema,
    groupSchema,
    photoSchema,

    shopSchema,
    userSchema,
    workSchema,

    goodSchema,
    categorySchema,
]