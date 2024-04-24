import { ObjectId } from 'mongodb';

export interface IBook {
  userId: ObjectId | string;
  title: string;
  author: string;
  isbn: string;
  hardcover: boolean;
}

export interface IShelf {
  userId: ObjectId;
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
  username: string;
  email: string;
  password: string;
  config: IUserConfig;
  token: string;
}

export interface IUserConfig {
  [key: string]: any;
}
