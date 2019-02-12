const createError = require('http-errors');
const express = require('express');
const {ApolloServer, AuthenticationError} = require('apollo-server-express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Dataloader = require('dataloader');
const http = require('http');
const router = express.Router();

const schema = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');
const secret = require('./config').secret;

const port= process.env.PORT || 3003

const app = express();
app.use('/uploads', express.static('uploads'))
app.use(cors());

mongoose.connect('mongodb://localhost/accounts');
mongoose.connection.once('open', ()=>{
  console.log('database connected')
});


const getMe = async req =>{
  const token = req.headers['me'];
  if(token){
    try {
      return await jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}

const server = new ApolloServer({
  subscriptions:{
    onConnect:()=>{
      console.log('client connected')
    },
    onDisconnect:()=>{
      console.log('client disconnected')
    }
  },
  typeDefs:schema,
  resolvers,
  context: async ({req, connection})=>{
    if(connection){
      return{
        models
      }
    }
    if(req){
      const me =await getMe(req);

      return {
        models,
        me,
        secret:secret,
        loaders:{
          user:new Dataloader(keys=>batchUsers(keys, models))
        }
      };
    }
  },
});


server.applyMiddleware({app, path: '/client'});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const photoRouter = require('./routes/photo');

app.use('/photo',photoRouter);


app.get('/', (req, res)=>{
  res.send('solo')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

httpServer.listen(port, ()=>console.log(`started port ${port}`))
