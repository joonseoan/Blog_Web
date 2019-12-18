const express = require('express');
const next = require('next');
// next's routes
const routes = require('../routes');
const { checkJWT, checkRole } = require('./services/auth');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
// directing the client's request to each each express's router 
//  inside of "app" which is next
const handle = routes.getRequestHandler(app);

const secretData = [{
  title: 'Secret Data 1',
  description: 'Plan How to build spaceship'
}, {
  title: 'Secret Data 2',
  description: 'My Secret Password'
}];


// app.prepare ==> preparing Express Server in "app"'s callback
app.prepare()
  .then(() => {
  
  // Preparing Express's callback
  const server = express();

  // middleware
  server.get('/api/v1/secret', checkJWT, (req, res) => {
    return res.json(secretData);
  });

  server.get('/api/v1/forsiteowner', checkJWT, checkRole('app owner'), (req, res) => {
    return res.json(secretData);
  });

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
    if(err.name == 'UnauthorizedError') {
      res.status(401).send({
        title: 'Unauthorized',
        detail: 'Unauthorized Acess!!'
      })
    }
  });

  // 
  server.use(handle).listen(3000, (err) => {
    if (err) throw err
    // console.log('> Ready on http://localhost:3000')
  });
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
