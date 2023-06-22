const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
const routes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const { authorizer } = require('./auth');
const app = express();
const port = 3030;
const { auth } = require('express-openid-connect');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/books', routes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Initialize the database before starting the server
db.initDb((err, _) => {
  if (err) {
    console.error('Error initializing database:', err);
  } else {
    console.log('Database initialized successfully');
    // Start the server after the database is initialized
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_LOGIN,
  issuerBaseURL: process.env.ISUER_URL
};

app.use(authorizer)

// Use the authorizer middleware for authentication


// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  const isAuthenticated = req.oidc.isAuthenticated();
  const user = req.oidc.user;

  console.log('Is Authenticated:', isAuthenticated);
  // console.log('User:', user);
  // console.log('OIDC', req.oidc);

  res.send(isAuthenticated ? 'Logged in' : 'Logged out');
});
