import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { inspectedLinks?: mongoDB.Collection } = {};
export const scamChatCollections: { chats?: mongoDB.Collection, messages?: mongoDB.Collection } = {};

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

export async function connectToScamChatDatabase() {
  console.log("tryingg...")
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGODB_CONN_STRING!
  );

  await client.connect();

  const dbChats: mongoDB.Db = client.db(process.env.CHATS_MONGODB_DB_NAME);
  
  const chatsCollection: mongoDB.Collection = dbChats.collection(process.env.CHATS_COLLECTION_NAME!);
  const messagesCollection: mongoDB.Collection = dbChats.collection(process.env.MESSAGES_COLLECTION_NAME!);

  scamChatCollections.messages = messagesCollection;
  scamChatCollections.chats = chatsCollection;

  console.log(
    `Successfully connected to database: ${dbChats.databaseName} and collection: ${chatsCollection.collectionName}\n
     Successfully connected to database: ${dbChats.databaseName} and collection: ${messagesCollection.collectionName}`
  );
}