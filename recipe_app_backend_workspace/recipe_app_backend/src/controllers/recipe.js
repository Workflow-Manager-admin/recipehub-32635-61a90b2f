const recipeModel = require('../models/recipe');

// PUBLIC_INTERFACE
exports.list = (req, res) => {
  /** List recipes, with optional search. */
  const search = req.query.search || '';
  const recipes = recipeModel.getAll({ search });
  res.json(recipes);
};

// PUBLIC_INTERFACE
exports.get = (req, res) => {
  /** Get recipe by id. */
  const recipe = recipeModel.getById(Number(req.params.id));
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  res.json(recipe);
};

// PUBLIC_INTERFACE
exports.create = (req, res) => {
  /** Create new recipe (authenticated only). */
  const { title, ingredients, instructions } = req.body;
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const recipe = recipeModel.create({
    title,
    ingredients,
    instructions,
    authorId: req.user.id,
  });
  res.status(201).json(recipe);
};

// PUBLIC_INTERFACE
exports.update = (req, res) => {
  /** Update recipe fields (authenticated only). */
  const id = Number(req.params.id);
  const recipe = recipeModel.getById(id);
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  if (recipe.authorId !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
  const { title, ingredients, instructions } = req.body;
  const updated = recipeModel.update(id, { title, ingredients, instructions });
  res.json(updated);
};

// PUBLIC_INTERFACE
exports.delete = (req, res) => {
  /** Delete recipe (authenticated only, owner only). */
  const id = Number(req.params.id);
  const recipe = recipeModel.getById(id);
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  if (recipe.authorId !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
  recipeModel.delete(id);
  res.status(204).end();
};
