import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { inspectedLinks?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGODB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.MONGODB_DB_NAME);

  const inspectedLinksCollection: mongoDB.Collection = db.collection(
    process.env.LINK_INSPECTION_COLLECTION_NAME!
  );
  collections.inspectedLinks = inspectedLinksCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${inspectedLinksCollection.collectionName}`
  );
}
