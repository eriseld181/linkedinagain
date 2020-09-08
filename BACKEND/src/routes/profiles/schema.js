const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const v = require("validator");

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    password: { type: String },
    surname: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: async (value) => {
          if (!v.isEmail(value)) {
            throw new Error("Email not valid!");
          }
        },
      },
    },
    bio: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      // required: true,
    },
    area: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
    },
    username: {
      type: String,
      // required: true,
      //   unique: true,
    },
    refreshTokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    googleId: { type: String }
    //in case of error, waiting to finish oauth
  },
  { timestamps: true }

);

const ProfileModel = model("profiles", ProfileSchema);
module.exports = ProfileModel;
