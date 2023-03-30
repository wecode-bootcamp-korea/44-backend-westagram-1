const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, profileImage, password } = req.body;

    if (!name || !email || !profileImage || !password) {
      return res.status(400).json({ message: "Key Error" });
    }

    await userService.signUp(name, email, profileImage, password);
    return res.status(201).json({ message: "SignUp Success" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  signUp,
};
