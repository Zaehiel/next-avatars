import { ObjectId } from 'mongodb';

export default class Avatar {
  constructor(
    public name: string,
    public image: string,
    public _id?: ObjectId | string
  ) {}
}