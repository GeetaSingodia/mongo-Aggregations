import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.ATLAS_URI);

let conn;
let db;

async function connectDB() {
try {
  conn = await client.connect();
  db = conn.db("samle_training"); 

  // create the indexes

  await db.collection("grades").createIndex({ class_id: 1});
  await db.collection("grades").createIndex({ learner_id: 1});
  await db.collection("grades").createIndex({ learner_id: 1, class_id: 1}); // compound index
  console.log("Index on class_id and learner_id created, including compound index");

  return db; // Return the db object

} catch (e) {
  console.error("Error connecting to MongoDB:", e);
}
}

//let db = conn.db("sample_training");
//connectDB();
db = await connectDB();

export default db;


