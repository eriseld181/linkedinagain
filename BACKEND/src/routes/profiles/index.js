const express = require("express");
const path = require("path");
const fs = require("fs-extra");
const multer = require("multer");
const q2m = require("query-to-mongo");
const jwt = require("jsonwebtoken");
const ProfileModel = require("./schema");
const bcrypt = require("bcryptjs");
const profileRouter = express.Router();
const upload = multer();
const port = process.env.PORT;
const imagePath = path.join(__dirname, "../../../public/image/profile");
const passport = require("passport")
const { authenticate, refreshToken } = require("./authTools")
const { authorize } = require("./authorize")
//-------------------------------------------------------------------
//linkedin login with oAuth
profileRouter.get("/linkedinLogin", passport.authenticate("linkedin"),

  profileRouter.get("/linkedinRedirect", passport.authenticate("linkedin", {

    failureRedirect: "/login"
  }),
    async (req, res, next) => {
      try {
        const user = req.user;
        res.send("ok");

        // res.status(200).redirect('/');
        res.status(200).send('Done');
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  ))
//-------------------------------------------------------------------
//Redirect to the google api login page. It shows the login with google/
profileRouter.get("/googleLogin", passport.authenticate("google",
  { scope: ["profile", "email"] }))

profileRouter.get("/googleRedirect", passport.authenticate("google"),
  async (req, res, next) => {
    try {
      res.send("OK")
    } catch (error) {
    }
  })
//-------------------------------------------------------------------
//Facebook login with oAuth
profileRouter.get('/facebookLogin',
  passport.authenticate('facebook', { scope: ["email"] }));

profileRouter.get('/facebookRedirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



//-------------------------------------------------------------------
//Register to linkedin page => http://localhost:4000/profiles/register
profileRouter.post("/register", async (req, res, next) => {
  try {
    let newUser = await new ProfileModel({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 8),
    });

    await newUser.save();
    res.send("saved");
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//-------------------------------------------------------------------
//Login to linkedin page

// profileRouter.post("/login", async (req, res, next) => {
//   try {

//     const { email, password } = req.body
//     console.log("reqqqq", req.body)
//     const user = await ProfileModel.findByCredentials(email, password)
//     const tokens = await authenticate(user)
//     res.send(tokens)
//   } catch (error) {
//     console.log(error)
//     next(error)
//   }
// })
profileRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await ProfileModel.findByCredentials(email, password)
    const { token, refreshToken } = await authenticate(user)
    res.cookie("accessToken", token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
    })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/users/refreshToken",
      sameSite: true,
    })
    res.send({ token, refreshToken })
  } catch (error) {
    next(error)
  }
})
//-------------------------------------------------------------------
//Receives all the users together => http://localhost:4000/profiles
profileRouter.get("/", authorize, async (req, res, next) => {
  try {
    const query = q2m(req.query);
    console.log(query);
    const users = await ProfileModel.find(query.criteria, query.options.fields)
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort);
    res.send({ totalUsers: users.length, data: users });
  } catch (error) {
    next(error);
  }
});
//-------------------------------------------------------------------
//Receive a single user => http://localhost:4000/eriseld
profileRouter.get("/:username", authorize, async (req, res, next) => {
  try {
    const user = await ProfileModel.findOne({ username: req.params.username });
    if (user) {
      res.status(200).send(user);
    } else res.status(404).send("not found!");
  } catch (error) {
    next(error);
  }
});
profileRouter.delete("/:username", authorize, async (req, res, next) => {
  try {
    await req.user.remove()
    res.send("Deleted")
  } catch (error) {
    next(error)
  }
})
//-------------------------------------------------------------------
//What is this?
profileRouter.put("/:username", authorize, async (req, res, next) => {
  try {
    const user = await ProfileModel.findOneAndUpdate(
      { username: req.params.username },
      req.body
    );
    if (user) {
      res.send("Record updated!");
    } else {
      const error = new Error(
        `User with username ${req.params.username} not found`
      );
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});
//-------------------------------------------------------------------
//What is this?
profileRouter.post(
  "/:username/picture",
  upload.single("user"),
  async (req, res, next) => {
    try {
      await fs.writeFile(
        path.join(imagePath, `${req.params.username}.jpg`),
        req.file.buffer
      );

      req.body = {
        image: `http://127.0.0.1:${port}/image/profile/${req.params.username}.jpg`,
      };
      const user = await ProfileModel.findOneAndUpdate(
        { username: req.params.username },
        req.body
      );
      if (user) {
        res.send("Record updated!");
      } else {
        const error = new Error(
          `User with username ${req.params.username} not found`
        );
        error.httpStatusCode = 404;
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
);
//-------------------------------------------------------------------
//What is this?
profileRouter.get("/:username/cv", async (req, res, next) => {
  try {
    const source = fs.createReadStream(
      path.join(imagePath, `${req.params.username}`)
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.params.username}`
    );
    source.pipe(res);

    source.on("error", (error) => {
      next(error);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = profileRouter;
