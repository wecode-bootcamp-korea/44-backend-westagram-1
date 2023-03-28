const validateToken = async (req, res, next) => {
  const checkHash = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  try {
    const token = req.headers.authorization;
    const { email, password } = req.body;
  } catch (err) {
    next(err);
  }
};
