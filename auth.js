const express = require('express');
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_LOGIN,
  issuerBaseURL: process.env.ISUER_URL
};

const authorizer = auth(config);

module.exports = { authorizer };
