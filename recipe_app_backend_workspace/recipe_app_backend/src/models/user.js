const bcrypt = require('bcrypt');

/**
 * In-memory User Model for demonstration (replace with DB for production).
 */
class UserModel {
  constructor() {
    // userId: { id, username, passwordHash, favorites: [recipeIds] }
    this.users = {};
    this.nextId = 1;
  }

  // PUBLIC_INTERFACE
  async create({ username, password }) {
    /** Create a new user with username and hashed password. */
    const existing = Object.values(this.users).find(u => u.username === username);
    if (existing) throw new Error('Username already exists');
    const id = this.nextId++;
    const passwordHash = await bcrypt.hash(password, 10);
    this.users[id] = {
      id,
      username,
      passwordHash,
      favorites: []
    };
    return { id, username };
  }

  // PUBLIC_INTERFACE
  async validateCredentials(username, password) {
    /** Validate user credentials. Return user object if valid, else null. */
    const user = Object.values(this.users).find(u => u.username === username);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    return valid ? { id: user.id, username: user.username, favorites: user.favorites } : null;
  }

  // PUBLIC_INTERFACE
  getById(id) {
    /** Get user by id (without password hash). */
    const user = this.users[id];
    if (!user) return null;
    const { passwordHash, ...data } = user;
    return data;
  }

  // PUBLIC_INTERFACE
  getByUsername(username) {
    /** Get user by username. */
    const user = Object.values(this.users).find(u => u.username === username);
    if (!user) return null;
    const { passwordHash, ...data } = user;
    return data;
  }

  // PUBLIC_INTERFACE
  addFavorite(userId, recipeId) {
    /** Add recipe to user's favorites. */
    if (!this.users[userId]) throw new Error('User not found');
    if (!this.users[userId].favorites.includes(recipeId)) {
      this.users[userId].favorites.push(recipeId);
    }
    return this.getById(userId);
  }

  // PUBLIC_INTERFACE
  removeFavorite(userId, recipeId) {
    /** Remove recipe from user's favorites. */
    if (!this.users[userId]) throw new Error('User not found');
    this.users[userId].favorites = this.users[userId].favorites.filter(id => id !== recipeId);
    return this.getById(userId);
  }
}

module.exports = new UserModel();
