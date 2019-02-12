const {PubSub}= require('apollo-server');
const pubsub = new PubSub()

const MESSAGE_EVENTS = require('./message');
const TALK_EVENTS = require('./talk');
const EVENTS = {
    MESSAGE:MESSAGE_EVENTS,
    TALK:TALK_EVENTS,
}
module.exports={
    pubsub,
    EVENTS,
}