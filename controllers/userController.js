const { readData, writeData } = require('../models/userModel');

// Controller to create a new user
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const data = await readData();
    const newUser = { id: Date.now(), name, email, password };
    data.users.push(newUser);
    await writeData(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Controller to authenticate a user
async function authenticateUser(req, res) {
  try {
    const { email, password } = req.body;
    const data = await readData();
    const user = data.users.find(u => u.email === email && u.password === password);
    if (user) {
      res.json({ message: 'Authentication successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Controller to retrieve all users
async function getAllUsers(req, res) {
  try {
    const data = await readData();
    res.json(data.users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  createUser,
  authenticateUser,
  getAllUsers,
};
