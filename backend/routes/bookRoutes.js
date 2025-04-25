const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const bookModel = require('../models/booksModel'); // adjust the path according to your project structure

router.put('/borrow-books/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await bookModel.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      if (book.quantity <= 0) {
        return res.status(400).json({ error: 'Book is out of stock' });
      }
  
      // Decrement the quantity of the book
      book.quantity -= 1;
      await book.save();
  
      res.json({ message: 'Book borrowed successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Book is Out of Stock' });
    }
  });

// Borrow book route

// Fetch borrowed books for a user
router.get('/borrowed-books/:userId', async (req, res) => {
    try {
      const borrowedBooks = await Borrow.find({ userId: req.params.userId, returned: false }).populate('bookId');
      res.status(200).json(borrowedBooks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching borrowed books', error });
    }
  });

  
  // Return a book
router.put('/return-book/:borrowId', async (req, res) => {
  try {
    const borrowRecord = await Borrow.findById(req.params.borrowId);
    if (!borrowRecord) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    // Mark the book as returned
    borrowRecord.returned = true;
    await borrowRecord.save();

    // Update the book's availability in the Book collection
    await Book.findByIdAndUpdate(borrowRecord.bookId, { $inc: { availableCopies: 1 } });

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error });
  }
});


// Add Book 
router.post('/addbook', async (req, res) => {
    try {
        const data = req.body;
        const newBook = new bookModel(data);
        await newBook.save();
        res.status(200).json({ message: "Book Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add book" });
    }
});

router.get("/getbook", async(req, res)=>{
   let books;
   try{
         books = await bookModel.find();
         console.log(books);
         res.status(200).json({books});
   }catch(error){
      console.log(error);
   }
});


router.get("/getbook/:id", async (req,res) =>{
    let book;
    const id = req.params.id;
    try{
          book = await bookModel.findById(id);
          res.status(200).json({book: book}); // Send the book object
    }catch(error){
       console.log(error);
       res.status(500).json({ message: 'Error fetching book details' });
    }
 });



router.put('/updatebook/:id', async (req, res) => {
    const id = req.params.id;
    const { bookname, isbn, description, author, image, price, quantity } = req.body;
    try {
        const book = await bookModel.findByIdAndUpdate(id, {
            bookname,
            isbn,
            description,
            author,
            image,
            price,
            quantity,
        }, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update book' });
    }
});



router.delete('/deletebook/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const book = await bookModel.findByIdAndDelete(id);
        if (book) {
            res.status(200).json({ message: "Deleted Successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete book" });
    }
});

// Route to get all books
router.get('/getbooks', async (req, res) => {
    try {
        const books = await bookModel.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch books' });
    }
});

router.get('/api/getbook/:id', async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book details' });
    }
});

module.exports = router;