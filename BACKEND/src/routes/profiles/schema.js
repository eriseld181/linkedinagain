const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const v = require("validator");
const bcrypt = require("bcryptjs")
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
    googleId: { type: String },
    linkedinId: { type: String },
    facebookId: { type: String },
    //in case of error, waiting to finish oauth
  },
  { timestamps: true }

);

ProfileSchema.statics.findByCredentials = async (email, password) => {
  console.log(email)
  const user = await ProfileModel.findOne({ email })
  console.log(user)

  const isMatch = await bcrypt.compare(password, user.password)

  try {
    console.log(isMatch)
    if (!isMatch) {
      const err = new Error("Unable to login")
      err.httpStatusCode = 401
      throw err
    }

    return user
  } catch (error) {
    console.log(error)
  }

}
// ProfileSchema.statics.findByCredentials = async (email, password) => {
//   const user = await ProfileModel.findOne({ email })

//   const isMatch = await bcrypt.compare(password, user.password)
//   if (isMatch) return user
//   else {
//     const err = new Error("Unable to login")
//     err.httpStatusCode = 401
//     throw err
//   }


// }
ProfileSchema.pre("save", async function (next) {
  const user = this
  console.log(user)
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

ProfileSchema.post("validate", function (error, doc, next) {
  if (error) {
    error.httpStatusCode = 400
    next(error)
  } else {
    next()
  }
})

ProfileSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    error.httpStatusCode = 400
    next(error)
  } else {
    next()
  }
})
ProfileSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.__v

  return userObject
}

const ProfileModel = model("profiles", ProfileSchema);
module.exports = ProfileModel;
