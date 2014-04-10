// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'twitterAuth' : {
    //changed to be environment variables
    'consumerKey'     : process.env.consumerKey,
    'consumerSecret'  : process.env.consumerSecret,
    'callbackURL'     : process.env.callbackURL
  } 

};

// twitterAuth keys were reset on April 7th.
