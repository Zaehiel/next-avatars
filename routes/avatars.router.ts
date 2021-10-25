import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from "../services/avatarsDB.service";
import Avatar from '../lib/models/avatar';

export const avatarsRouter = express.Router();

avatarsRouter.use(express.json());

avatarsRouter.get('/', async (_req: Request, res: Response) => {
  try {
     const avatars = (await collections.avatars?.find({}).toArray()) as Avatar[];

      res.status(200).send(avatars);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

avatarsRouter.post('/', async (req: Request, res: Response) => {
  try {
      const avatar = req.body as Avatar;
      const result = await collections.avatars?.insertOne(avatar);

      result
          ? res.status(201).send(`Successfully added avatar with id ${result.insertedId}`)
          : res.status(500).send("Failed to add avatar.");
  } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
  }
});

avatarsRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
      const query = { _id: new ObjectId(id) };
      const result = await collections.avatars?.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Successfully removed avatar with id ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove avatar with id ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Avatar with id ${id} does not exist`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});