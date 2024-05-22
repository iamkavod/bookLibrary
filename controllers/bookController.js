const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

// Controller to create a book
const createBook = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const newBook = { id: jsonData.books.length + 1, ...req.body };
    jsonData.books.push(newBook);
    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error });
  }
};


// Controller to get all books
const getAllBooks = async (req, res) => {
  try {
    console.log('Reading data file from:', dataFilePath); // Log the file path
    const data = await fs.readFile(dataFilePath, 'utf8');
    console.log('Data read from file:', data); // Log the raw data
    const jsonData = JSON.parse(data);
    res.json(jsonData.books);
  } catch (error) {
    console.error('Error fetching books:', error); // Log the error
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Controller to delete a book
const deleteBook = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    jsonData.books = jsonData.books.filter(book => book.id !== parseInt(req.params.id, 10));
    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};

// Controller to update a book
const updateBook = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const bookIndex = jsonData.books.findIndex(book => book.id === parseInt(req.params.id, 10));
    if (bookIndex !== -1) {
      jsonData.books[bookIndex] = { ...jsonData.books[bookIndex], ...req.body };
      await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
      res.json(jsonData.books[bookIndex]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// Controller to loan out a book
const loanOutBook = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const bookIndex = jsonData.books.findIndex(book => book.id === parseInt(req.params.id, 10));
    if (bookIndex !== -1 && jsonData.books[bookIndex].available) {
      jsonData.books[bookIndex].available = false;
      jsonData.books[bookIndex].loanedTo = req.body.userId;
      await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
      res.json({ message: 'Book loaned out', book: jsonData.books[bookIndex] });
    } else {
      res.status(404).json({ message: 'Book not found or already loaned out' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error loaning out book', error });
  }
};

// Controller to return a book
const returnBook = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const bookIndex = jsonData.books.findIndex(book => book.id === parseInt(req.params.id, 10));
    if (bookIndex !== -1 && !jsonData.books[bookIndex].available) {
      jsonData.books[bookIndex].available = true;
      delete jsonData.books[bookIndex].loanedTo;
      await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
      res.json({ message: 'Book returned', book: jsonData.books[bookIndex] });
    } else {
      res.status(404).json({ message: 'Book not found or not loaned out' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
  loanOutBook,
  returnBook
};
