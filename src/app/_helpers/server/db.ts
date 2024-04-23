import mongoose from 'mongoose';
import { IBook, IShelf, IUser } from '../interfaces';

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI!);
mongoose.Promise = global.Promise;

export const db = {
  Book: bookModel(),
  Shelf: shelfModel(),
  User: userModel()
};

// mongoose models with schema definitions

function bookModel() {
  const schema = new Schema<IBook>(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      title: { type: String, required: true },
      author: { type: String, required: false },
      isbn: { type: String, required: false },
      hardcover: { type: Boolean, required: false }
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true
    }
  );

  setCommonSchemaOptions(schema);
  return mongoose.models.Book || mongoose.model('Book', schema);
}

function shelfModel() {
  const schema = new Schema<IShelf>(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      title: { type: String, required: true },
      description: { type: String, required: false },
      config: { type: Object, required: false },
      books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
      public: { type: Boolean, required: false }
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true
    }
  );

  setCommonSchemaOptions(schema);
  return mongoose.models.Shelf || mongoose.model('Shelf', schema);
}

function userModel() {
  const schema = new Schema<IUser>(
    {
      username: { type: String, unique: true, required: true },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      config: { type: Object, required: false },
      token: { type: String, required: true }
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true
    }
  );

  setCommonSchemaOptions(schema);
  return mongoose.models.User || mongoose.model('User', schema);
}

function setCommonSchemaOptions(schema: mongoose.Schema) {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
    }
  });
}
