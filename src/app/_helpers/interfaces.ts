import { ObjectId } from 'mongodb';

export interface IBook {
  _id?: ObjectId | string;
  userId: ObjectId | string;
  title: string;
  author: string;
  isbn: string;
  hardcover: boolean;
}

export interface IShelf {
  _id?: ObjectId | string;
  userId: ObjectId | string;
  title: string;
  description: string;
  config: IShelfConfig;
  books: IBook[];
  public: boolean;
}

export interface IShelfConfig {
  [key: string]: any;
}

export interface IUser {
  _id?: ObjectId | string;
  username: string;
  email: string;
  password: string;
  config: IUserConfig;
  token: string;
}

export interface IUserConfig {
  [key: string]: any;
}
