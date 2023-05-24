const { MongoClient } = require('mongodb')

require('dotenv').config()


const client = new MongoClient(process.env.MONGO_URI);

let conn;
async function connect(){
  try {
    conn = await client.connect();
  } catch(e) {
    console.error(e);
  }
  
  return conn.db("plates");
}

module.exports = connect;