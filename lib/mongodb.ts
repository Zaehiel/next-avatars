import { MongoClient, Db, MongoClientOptions } from 'mongodb'
const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB = process.env.DB_NAME!

if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI env variable')
}

if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB env variable')
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
    // load from cache
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        }
    }

    const opts: MongoClientOptions = {}

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts)
    await client.connect()
    let db = client.db(MONGODB_DB)

    // set cache
    cachedClient = client
    cachedDb = db

    return {
        client: cachedClient,
        db: cachedDb
    }
}