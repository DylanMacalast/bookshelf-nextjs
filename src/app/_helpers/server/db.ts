import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI!);
mongoose.Promise = global.Promise;

export const db = {
  Book: bookModel(),
  Shelf: shelfModel(),
  User: userModel(),
  UserBookShelf: userBookShelfModel(),
};

// mongoose models with schema definitions

function bookModel() {
  const schema = new Schema(
    {
      bookId: { type: String, unique: true, required: true },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );

  setCommonSchemaOptions(schema);
  return mongoose.models.Book || mongoose.model("Book", schema);
}

function shelfModel() {
  const schema = new Schema(
    {
      shelfId: { type: String, unique: true, required: true },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );

  setCommonSchemaOptions(schema);
  return mongoose.models.Shelf || mongoose.model("Shelf", schema);
}

function userModel() {
  const schema = new Schema(
    {
      userId: { type: String, unique: true, required: true },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );

  setCommonSchemaOptions(schema);
  return mongoose.models.User || mongoose.model("User", schema);
}

function userBookShelfModel() {
  const schema = new Schema(
    {
      bookShelfId: { type: String, unique: true, required: true },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );

  setCommonSchemaOptions(schema);
  return (
    mongoose.models.UserBookShelf || mongoose.model("UserBookShelf", schema)
  );
}

function setCommonSchemaOptions(schema: mongoose.Schema) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
    },
  });
}
