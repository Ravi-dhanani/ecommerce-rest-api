const jwt = require("jsonwebtoken");
const Users = require("../modals/usersSchema");
const Authenticate = async (req, res, next) => {
  try {
    const token = req.token;
    console.log(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await Users.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = Authenticate;
