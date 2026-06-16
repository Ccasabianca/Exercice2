var express = require('express');
var router = express.Router();

const API = 'http://localhost:9001/inventory';

function bookFromForm(body) {
  const book = {
    title: body.title,
    author: body.author,
    available: body.available === 'on',
  };
  if (body.price) book.price = Number(body.price);
  if (body.stock) book.stock = Number(body.stock);
  if (body.description) book.description = body.description;
  return book;
}

// GET /books
router.get('/', async function (req, res, next) {
  try {
    const response = await fetch(API + '/books');
    const books = await response.json();
    res.render('books', { books: books, message: req.query.message });
  } catch (err) { next(err); }
});

// GET /books/new
router.get('/new', function (req, res) {
  res.render('new');
});

// POST /books
router.post('/', async function (req, res, next) {
  try {
    await fetch(API + '/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookFromForm(req.body)),
    });
    res.redirect('/books?message=Livre ajoute');
  } catch (err) { next(err); }
});

// GET /books/:id
router.get('/:id', async function (req, res, next) {
  try {
    const response = await fetch(API + '/books/' + req.params.id);
    const book = await response.json();
    res.render('book', { book: book });
  } catch (err) { next(err); }
});

// GET /books/:id/edit
router.get('/:id/edit', async function (req, res, next) {
  try {
    const response = await fetch(API + '/books/' + req.params.id);
    const book = await response.json();
    res.render('edit', { book: book });
  } catch (err) { next(err); }
});

// POST /books/:id/edit : modifier
router.post('/:id/edit', async function (req, res, next) {
  try {
    await fetch(API + '/books/' + req.params.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookFromForm(req.body)),
    });
    res.redirect('/books?message=Livre modifie');
  } catch (err) { next(err); }
});

// POST /books/:id/delete : supprimer
router.post('/:id/delete', async function (req, res, next) {
  try {
    await fetch(API + '/books/' + req.params.id, { method: 'DELETE' });
    res.redirect('/books?message=Livre supprime');
  } catch (err) { next(err); }
});

module.exports = router;