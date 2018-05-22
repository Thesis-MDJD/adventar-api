var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://adventar.auth0.com/.well-known/jwks.json"
  }),
  audience: 'http://adventar-api',
  issuer: "https://adventar.auth0.com/",
  algorithms: ['RS256']
});