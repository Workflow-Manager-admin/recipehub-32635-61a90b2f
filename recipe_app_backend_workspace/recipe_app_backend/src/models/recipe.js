/**
 * In-memory Recipe Model for demonstration (replace with DB for production).
 */
class RecipeModel {
  constructor() {
    // recipeId: { id, title, ingredients, instructions, authorId, ... }
    this.recipes = {};
    this.nextId = 1;
  }

  // PUBLIC_INTERFACE
  create({ title, ingredients, instructions, authorId }) {
    /** Create a new recipe. */
    const id = this.nextId++;
    this.recipes[id] = { id, title, ingredients, instructions, authorId };
    return this.recipes[id];
  }

  // PUBLIC_INTERFACE
  getAll({ search } = {}) {
    /** Get all recipes, with optional search. */
    let list = Object.values(this.recipes);
    if (search) {
      list = list.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.ingredients.some(i => i.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return list;
  }

  // PUBLIC_INTERFACE
  getById(id) {
    /** Get recipe by id. */
    return this.recipes[id] || null;
  }

  // PUBLIC_INTERFACE
  update(id, updateObj) {
    /** Update a recipe. */
    if (!this.recipes[id]) return null;
    this.recipes[id] = { ...this.recipes[id], ...updateObj };
    return this.recipes[id];
  }

  // PUBLIC_INTERFACE
  delete(id) {
    /** Delete a recipe. */
    const deleted = this.recipes[id];
    delete this.recipes[id];
    return deleted;
  }
}

module.exports = new RecipeModel();
