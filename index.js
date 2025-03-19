import express from 'express';
import bodyParser from 'body-parser';np

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

let books = [
    {
        bookId: 1,
        Title: "The Whispering Woods of Eldoria",
        Author: "Elara Meadowlight",
        Publisher: "Arcane Realms Publishing"
    },
    {
        bookId: 2,
        Title: "Shadow of the Obsidian Tower",
        Author: "Darius Stormblade",
        Publisher: "Mythos Ink"
    },
    {
        bookId: 3,
        Title: "The Dragonsong Chronicles: Ember's Rise",
        Author: "Lyra Nightshade",
        Publisher: "Celestial Crown Books"
    }
];

// Add book endpoint
app.post('/add', (req, res) => {
    const { Title, Author, Publisher } = req.body;

    const newBook = {
        bookId: books.length + 1,
        Title: Title,
        Author: Author,
        Publisher: Publisher,
    };

    books.push(newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
});

// Retrieve all books endpoint
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// Retrieve specific book by ID endpoint
app.get('/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const book = books.find(b => b.bookId === bookId);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Update book by ID endpoint (using PATCH)
app.patch('/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const { Title, Author, Publisher } = req.body;
    const bookIndex = books.findIndex(b => b.bookId === bookId);

    if (bookIndex !== -1) {
        if (Title) {
            books[bookIndex].Title = Title;
        }
        if (Author) {
            books[bookIndex].Author = Author;
        }
        if (Publisher) {
            books[bookIndex].Publisher = Publisher;
        }

        res.status(200).json({ message: 'Book updated successfully', book: books[bookIndex] });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Delete book by ID endpoint (using req.body.bookId)
app.delete('/books', (req, res) => {
    const bookId = req.body.bookId;

    if (typeof bookId !== 'number') {
        return res.status(400).json({ message: "Invalid bookId. bookId must be a number." });
    }

    const bookIndex = books.findIndex(b => b.bookId === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(200).json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.listen(3000, () => {
    console.log("Running on port 3000");
    console.log("Server is running on http://localhost:3000");
}); 