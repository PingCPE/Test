const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
  console.log('Received request to create user:', req.body); // Log the request body
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
};


// Retrieve all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
