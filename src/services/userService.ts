import { MongoClient } from 'mongodb';

    const uri = process.env.MONGODB_URI!;
    const client = new MongoClient(uri);

    export const fetchUsers = async () => {
      await client.connect();
      const database = client.db(process.env.DATABASE_NAME);
      const users = await database.collection('users').find().toArray();
      return users;
    };

    export const createUserIfNotExists = async (email: string, role: string) => {
      await client.connect();
      const database = client.db(process.env.DATABASE_NAME);
      const user = await database.collection('users').findOne({ email });

      if (!user) {
        await database.collection('users').insertOne({ email, role });
      }
    };
