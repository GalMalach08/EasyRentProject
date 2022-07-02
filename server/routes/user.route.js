const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const { getUserProps, validateToken } = require("../utils");
const {
  sendResetPasswordEmail,
  sendVerificationMail,
} = require("../utils/sendEmail");
const User = require("../db/models/user_schema");
const UserPref = require("../db/models/user_prefrences_schema");
const auth = require("../middlewares/auth");

// Sign in user
router.post("/signin", async (req, res) => {
  try {
    // 1 Find a user
    const user = await User.findOne({ email: req.body.email }).populate(
      "preferences"
    );
    if (!user)
      return res
        .status(400)
        .json({ message: "שם המשתמש או הסיסמה אינם נכונים" });
    // compare password
    const compare = await user.comparePassword(req.body.password);
    if (!compare)
      return res
        .status(400)
        .json({ message: "שם המשתמש או הסיסמה אינם נכונים" });
    const token = await user.generateAuthToken();

    res
      .status(200)
      .cookie("x-access-token", token)
      .send({ user: getUserProps(user) });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Error", error: err });
  }
});

// Sign up user
router.post("/signup", async (req, res) => {
  try {
    // 1 check if email taken
    if (await User.emailTaken(req.body.email)) {
      return res.status(400).json({ message: "כתובת האיימיל הינה בשימוש" });
    }

    // 2 creating the model (hash password)
    const user = new User({
      ...req.body,
    });
    const doc = await user.save();
    const token = await doc.generateAuthToken();
    sendVerificationMail(doc.email, `${doc.firstname} ${doc.lastname}`, token);
    res
      .status(200)
      .cookie("x-access-token", token)
      .send({ user: getUserProps(doc) });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error", error: error });
  }
});

// Get user by email
router.post("/isexcistbyemail", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({
    email,
  });
  if (user) res.send({ success: true, user });
  else res.send({ success: false });
});

// check if user excist by google or facebook id
router.post("/isexcist", async (req, res) => {
  try {
    const { googleId, facebookId } = req.body;
    let user;
    if (googleId) user = await User.findOne({ googleId });
    else if (facebookId) user = await User.findOne({ facebookId });

    if (user) {
      const token = await user.generateAuthToken();
      res
        .status(200)
        .cookie("x-access-token", token)
        .send({ success: true, user: getUserProps(user) });
    } else res.status(200).send({ success: false });
  } catch (error) {
    res.status(401).json({ message: "Error", error: error });
  }
});

// reset user password
router.post("/resetpassword", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const response = await sendResetPasswordEmail(
    email,
    user.firstname,
    user.lastname
  );
  if (response.success) {
    console.log("the email sent successfuly");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(response.password, salt);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hash, confirmPassword: hash, isJustChangedPassword: true },
      { new: true, runvalidtors: true, useFindAndModify: false }
    );
    res.send({ success: true, user });
  } else {
    res.send({ success: false });
  }
});

// reset user password
router.post("/changepassword", async (req, res) => {
  const { password, confirmPassword, id } = req.body;
  if (password === confirmPassword) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        password: newPassword,
        confirmPassword: newPassword,
        isJustChangedPassword: false,
      },
      { new: true, runvalidtors: true, useFindAndModify: false }
    );
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

//skiping reset user password
router.get("/skipreset/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.isJustChangedPassword = false;
    await user.save();
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
});

//add user's prefrences
router.post("/addpref", auth(), async (req, res) => {
  try {
    console.log(req.body);
    let oldUserPref = await UserPref.findOneAndUpdate(
      { userId: req.body.userId },
      { ...req.body }
    );
    console.log(oldUserPref);
    if (!oldUserPref) {
      const newUserPref = new UserPref({ ...req.body });
      await newUserPref.save();
      let user = await User.findById(req.body.userId);
      user.preferences = newUserPref._id;
      await user.save();
    }
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
});

router.get("/verify", auth(), async (req, res) => {
  try {
    const token = validateToken(req.query.validation);
    const user = await User.findById(token.sub);
    if (user.isVerified)
      return res.send({ verified: true, message: "המשתמש כבר מאומת" });
    user.isVerified = true;
    await user.save();
    res.send({ verified: true });
  } catch (err) {
    console.log("error", err);
    res.send({ verified: false });
  }
});

router.post("/sendverifyemail", auth(), async (req, res) => {
  try {
    const { id, token } = req.body;
    const user = await User.findById(id);
    const success = await sendVerificationMail(
      user.email,
      `${user.firstname} ${user.lastname}`,
      token
    );
    res.send({ success });
  } catch (err) {
    console.log("error", err);
    res.send({ verified: false });
  }
});

router.get("/isauth", auth(), async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (err) {
    console.log("error", err);
  }
});
module.exports = router;
