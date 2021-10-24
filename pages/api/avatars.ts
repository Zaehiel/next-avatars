// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'
import Avatar from '../../lib/models/avatar'

const AVATARS_COLLECTION = 'avatars';

const errorHandler = (e: unknown, res: Response) => {
    if (e instanceof Error) {
        return res.json({
            message: e.message,
            success: false,
        });
    }
    return res.json({
        message: 'Something went wrong',
        success: false,
    });
}

// get all the avatars
async function getAvatars(req: Request, res: Response) {
    try {
        const { db } = await connectToDatabase();
        let avatars = await db
            .collection(AVATARS_COLLECTION)
            .find({})
            .sort({ published: -1 })
            .toArray() as Avatar[];

        return res.json({
            message: JSON.parse(JSON.stringify(avatars)),
            success: true,
        });
    } catch (error) {
        errorHandler(error, res)
    }
}

// Add new avatar
async function addAvatar(req: Request, res: Response) {
    try {
        const { db } = await connectToDatabase();
        const avatar = req.body as Avatar;
        await db.collection(AVATARS_COLLECTION).insertOne(JSON.parse(req.body));
        return res.json({
            message: 'Avatar added',
            success: true,
        });

    } catch (error) {
        errorHandler(error, res)
    }
}

// deleting a post
async function deleteAvatar(req: Request, res: Response) {
    try {
        const { db } = await connectToDatabase();

        await db.collection(AVATARS_COLLECTION).deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'Avatar deleted successfully',
            success: true,
        });
    } catch (error) {
        errorHandler(error, res)
    }
}

export default async function handler(req: Request, res: Response) {
  // switch the methods
  switch (req.method) {
      case 'GET': {
          return getAvatars(req, res);
      }
      case 'POST': {
          return addAvatar(req, res);
      }
      case 'DELETE': {
          return deleteAvatar(req, res);
      }
  }
}