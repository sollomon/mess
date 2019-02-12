const {GraphQLDateTime} = require('graphql-iso-date');

const messageResolver = require('./message');
const chatResolver = require('./chat');
const topicResolver = require('./topic');
const opinionResolver = require('./opinion');
const groupResolver = require('./group');
const talkResolver = require('./talk');
const photoResolver = require('./photo');
//user
const shopResolver = require('./shop');
const userResolver = require('./user');
const workResolver = require('./work')
//goods
const goodResolver = require('./good');
const categoryResolver = require('./category');

const customScalarResolver = {
    Date:GraphQLDateTime,
};

module.exports=[
    customScalarResolver,
    messageResolver,
    chatResolver,
    topicResolver,
    opinionResolver,
    groupResolver,
    talkResolver,
    photoResolver,

    shopResolver,
    userResolver,
    workResolver,

    goodResolver,
    categoryResolver,
]