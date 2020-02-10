const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// next's routes
const routes = require('../routes');
const { checkJWT, checkRole } = require('./services/auth');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

// directing the client's request to each each express's router 
//  inside of "app" which is next
const handle = routes.getRequestHandler(app);
const { MONGO_SERVER } = require('./config');
require('./models');

const bookAPIs = require('./routes/book');
const graphQLServer = require('./graphql/apolloServer');  

const secretData = [{
  title: 'Secret Data 1',
  description: 'Plan How to build spaceship'
}, {
  title: 'Secret Data 2',
  description: 'My Secret Password'
}];

// useNewUrlParser --> option for mongoose
mongoose.connect(MONGO_SERVER, { 
    useNewUrlParser: true,  
    useUnifiedTopology: true 
  })
  .then(() => console.log('MongoDB is successfully connected!'))
  .catch(err => {
    console.log(err);
  });


// app.prepare ==> preparing Express Server in "app"'s callback
app.prepare()
  .then(() => {
  
// Preparing Express's callback
  const server = express();

  server.use(bodyParser.json());

  server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
  
    if(req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
  
  server.use('/api/v1/books', bookAPIs);

  // middleware
  server.get('/api/v1/secret', checkJWT, (req, res) => {
    return res.json(secretData);
  });

  server.get('/api/v1/forsiteowner', checkJWT, checkRole('app owner'), (req, res) => {
    return res.json(secretData);
  });

  // [ IMPORTANT ]: must be above all routers.
  graphQLServer.applyMiddleware({ app: server });
  
  // Receives any GET request 
  // ---------------------------------------------------------
  server.get('*', (req, res) => {
    return handle(req, res)
  });


  // ---------------------------------------------------------

  // It is for all endpoints including(get, post, patch, delete...)
  // Therefore, it can be placed after server.get('*', (req, res) => {})

  // Cerntral error handler for all endpoints!
  server.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
      res.status(401).send({
        title: 'Unauthorized',  
        detail: 'Unauthorized Acess!!'
      })
    }
  });
   
  server.use(handle).listen(3000, (err) => {
    if (err) throw new Error(err);
    console.log(`Server ready at http://localhost:3000 & http://localhost:3000${ graphQLServer.graphqlPath }`)
  });
  
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
});