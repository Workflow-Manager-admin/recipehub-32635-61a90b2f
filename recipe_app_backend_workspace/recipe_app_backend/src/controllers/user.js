const userModel = require('../models/user');
const { generateToken } = require('../services/auth');
const recipeModel = require('../models/recipe');

// PUBLIC_INTERFACE
exports.register = async (req, res) => {
  /** Register a new user. */
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });
    const user = await userModel.create({ username, password });
    return res.status(201).json({ id: user.id, username: user.username });
  } catch (e) {
    return res.status(409).json({ message: e.message });
  }
};

// PUBLIC_INTERFACE
exports.login = async (req, res) => {
  /** Login user and return JWT. */
  try {
    const { username, password } = req.body;
    const user = await userModel.validateCredentials(username, password);
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });
    const token = generateToken(user);
    return res.json({ token, id: user.id, username: user.username, favorites: user.favorites });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// PUBLIC_INTERFACE
exports.profile = (req, res) => {
  /** Get authenticated user's profile (id, username, favorites). */
  const user = userModel.getById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
};

// PUBLIC_INTERFACE
exports.addFavorite = (req, res) => {
  /** Add recipe to authenticated user's favorites. */
  try {
    const { recipeId } = req.body;
    const recipe = recipeModel.getById(recipeId);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    const user = userModel.addFavorite(req.user.id, recipeId);
    return res.json(user);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

// PUBLIC_INTERFACE
exports.removeFavorite = (req, res) => {
  /** Remove recipe from user's favorites. */
  try {
    const { recipeId } = req.body;
    const recipe = recipeModel.getById(recipeId);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    const user = userModel.removeFavorite(req.user.id, recipeId);
    return res.json(user);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
