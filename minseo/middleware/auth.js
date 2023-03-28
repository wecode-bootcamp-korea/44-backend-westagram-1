const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
  } catch (err) {
    next(err);
  }
};
