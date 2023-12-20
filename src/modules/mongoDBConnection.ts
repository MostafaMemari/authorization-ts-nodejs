import * as mongoose from "mongoose";

mongoose
  .connect(`mongodb://127.0.0.1:27017/node-ts`)
  .then(() => console.log("connected To node-ts DB!"))
  .catch((err) => console.log(err.message));
