export interface IBook {
  bookId: number;
  userID: number;
  title: string;
  author: string;
  isbn: string;
  hardcover: boolean;
}

export interface IShelf {
  shelfId: number;
  userId: number;
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
  userId: number;
  username: string;
  email: string;
  password: string;
  config: IUserConfig;
  token: string;
}

export interface IUserConfig {
  [key: string]: any;
}
