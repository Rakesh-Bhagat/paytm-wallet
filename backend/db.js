import mongoose, { mongo } from "mongoose"
import { Schema} from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.Mongo_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1); // Exit process if connection fails
    }
  };
  
  connectDB();

const userSchema = new Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

})

const accoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});

export const Account = mongoose.model('Account', accoutSchema);


 export const User = mongoose.model('User', userSchema);

//  module.exports = {
//     User
//  }