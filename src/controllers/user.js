const bcrypt = require("bcrypt");
const CreateUser = async (req, res) => {
  try {
    var { username, email, password } = req.body;
    if (username && email && password) {
      password = bcrypt.hashSync(password, 12);
      const checkUserExists = await findUserByEmail(email);
      if (checkUserExists)
        res.status(400).json({ status: false, message: "User already exists" });
      else {
        const user = await userCreate({ username, email, password });
        if (!user)
          res
            .status(400)
            .json({ status: false, message: " could not create user" });
        else res.status(200).json({ status: true, data: user });
      }
    } else
      res.status(400).json({ status: false, message: "Error creating user" });
  } catch (error) {
    res.status(400).json({ status: false, message: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    var { email, password } = req.body;
    if (email && password) {
      const user = await findUserByEmail(email);
      if (!user)
        res
          .status(400)
          .json({ status: false, message: "Invalid crediantials" });
      else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          res
            .status(400)
            .json({ status: false, message: "Invalid crediantials" });
        else res.status(200).json({ status: true, data: user });
      }
    } else res.status(400).json({ status: false, message: "Error Login user" });
  } catch (error) {
    res.status(400).json({ status: false, message: "Error Login user" });
  }
};

const db = require("../database/db");
const userTable = db.getRepository("user");

const userCreate = async (user) => {
  const result = await userTable.save(user);
  return result;
};

const findUserByEmail = async (email) => {
  const result = await userTable.findOne({ where: { email } });
  return result;
};

const createUserIfNotExists = async (user) => {
  const userRepository = db.getRepository("user");
  const userExists = await userRepository.findOne({
    where: { email: user.email },
  });
  if (userExists) return userExists;
  const newUser = await userRepository.create(user);
  await userRepository.save(newUser);
  return newUser;
};

module.exports = {
  userCreate,
  findUserByEmail,
  CreateUser,
  loginUser,
  createUserIfNotExists,
};
