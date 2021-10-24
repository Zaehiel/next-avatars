import { ObjectId } from 'mongodb';

export default class Avatar {
  constructor(
    public name: string,
    public image: string,
    public id?: ObjectId
  ) {}
}