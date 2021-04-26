// load specific environment config file, depending on environment
const path = require("path")
const fs = require("fs")
const dotenv = require("dotenv")

// on production: always load .env file
if(process.env.NODE_ENV == "production") {
  dotenv.config()
}
// running locally ? check for a .env.development file
else {
  let envPath = path.join(__dirname, '..',  '.env.development')

  // .env.devevelopment file exists? => load that one instead of .env 
  if(fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
  }
  // no .env.development? load .env as usual
  else {
    dotenv.config()
  }
}

const { env } = process;

// advantage of config object: it gives us nice autocompletion for config vars in code 
// (for process.env variables we do not have autocompletion) 
const config = {
  env: env.NODE_ENV || 'development',
  db: env.MONGO_DB,
  jwtSecret: env.JWT_SECRET,
  frontendOrigin: env.FRONTEND_ORIGIN,
};

console.log('OUR ENVIROMENT SETUP IS:', config.env);
console.log(config)

module.exports = config