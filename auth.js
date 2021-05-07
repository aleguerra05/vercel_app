// auth.js

/**
 * Required External Modules
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");
const querystring = require("querystring");

require("dotenv").config();

/**
 * Routes Definitions
 */
router.get(
    "/login",
    passport.authenticate("auth0", {
      scope: "openid email profile"
    }),
    (req, res) => {
      res.redirect("/");
    }
  );

  router.get("/callback", (req, res, next) => {
    passport.authenticate("auth0", (err, user, info) => {
      if (err) {
        console.log(err);
        console.log(info);
        console.log(user);
        return next(err);
      }
      if (!user) {
        console.log(user);
        console.log(info);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        console.log(user);
        console.log(info);
        res.redirect(returnTo || "/");
      });
    })(req, res, next);
  });

  router.get("/logout", (req, res) => {
    req.logOut();
  
    let returnTo = req.protocol + "://" + req.hostname;
    const port = req.connection.localPort;
  
    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo =
        process.env.NODE_ENV === "production"
          ? `${returnTo}/`
          : `${returnTo}:${port}/`;
    }
  
    const logoutURL = new URL(
      `https://${process.env.AUTH0_DOMAIN}/v2/logout`
    );
  
    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo: returnTo
    });
    logoutURL.search = searchString;
  
    res.redirect(logoutURL);
  });

  var axios = require("axios").default;

var options = {
  method: 'PATCH',
  url: 'https://dev-6nk1awmf.us.auth0.com/api/v2/clients/UcP9P0zYUN3Pv44nxHtmVgauwwVGc2HD',
  headers: {
    'content-type': 'application/json',
    authorization: 'Bearer API2_ACCESS_TOKEN',
    'cache-control': 'no-cache'
  },
  data: {initiate_login_uri: '/login'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

  

/**
 * Module Exports
 */
module.exports = router;