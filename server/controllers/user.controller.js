import jsonwebtoken from "jsonwebtoken";
import userModel from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";

const singup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const isUserExist = await userModel.findOne({ username });

    if (isUserExist)
      return responseHandler.badRequest(res, "User already exist.");

    const user = new userModel();

    user.username = username;
    user.displayName = displayName;
    user.setPassword(password);

    await user.save();

    // NO DATA----------------------------
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, { token, ...user._doc, id: user.id });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    console.log("userController signin start");
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayName");

    if (!user) return responseHandler.badRequest(res, "User not exist.");

    if (!user.validPassword(password))
      return responseHandler.badRequest(res, "Incorrect password.");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, { token, ...user._doc, id: user.id });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select("password salt id");

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password))
      return responseHandler.badRequest(res, "Invalid password.");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notFound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default { singup, signin, getInfo, updatePassword };
