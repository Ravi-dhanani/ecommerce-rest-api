const jwt = require("jsonwebtoken");
const Users = require("../modals/usersSchema");
const Authenticate = async (req, res, next) => {
  try {
    const token = req.localStorage.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await Users.findOne({
      _id: verifyToken._id,
      "tokens:token": token,
    });
    if (!rootUser) {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
  }
};
