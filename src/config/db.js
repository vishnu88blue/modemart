import mongoose from "mongoose";

let catched = global.mongoose;
if (!catched) {
  catched = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (catched.conn) {
    return catched.conn;
  }

  if (!catched.promise) {
    const opts = {
      bufferCommands: false,
    };

    catched.promise = mongoose.connect(`${process.env.MONGODB_URI}/ModernMart`, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  catched.conn = await catched.promise;
  return catched.conn;
}

export default dbConnect;