var express = require('express');
var router = express.Router();

const API = 'http://localhost:9001/orders';

function orderFromForm(body) {
  const order = { customerName: body.customerName };
  if (body.orderDate) order.orderDate = body.orderDate;
  if (body.totalAmount) order.totalAmount = Number(body.totalAmount);
  if (body.status) order.status = body.status;
  return order;
}

// GET /orders
router.get('/', async function (req, res, next) {
  try {
    const response = await fetch(API + '/orders');
    const orders = await response.json();
    res.render('orders', { orders: orders, message: req.query.message });
  } catch (err) { next(err); }
});

// GET /orders/new
router.get('/new', function (req, res) {
  res.render('order-new');
});

// POST /orders
router.post('/', async function (req, res, next) {
  try {
    await fetch(API + '/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderFromForm(req.body)),
    });
    res.redirect('/orders?message=Commande ajoutee');
  } catch (err) { next(err); }
});

// GET /orders/:id
router.get('/:id', async function (req, res, next) {
  try {
    const response = await fetch(API + '/orders/' + req.params.id);
    const order = await response.json();
    res.render('order', { order: order });
  } catch (err) { next(err); }
});

// GET /orders/:id/edit
router.get('/:id/edit', async function (req, res, next) {
  try {
    const response = await fetch(API + '/orders/' + req.params.id);
    const order = await response.json();
    res.render('order-edit', { order: order });
  } catch (err) { next(err); }
});

// POST /orders/:id/edit : modifier
router.post('/:id/edit', async function (req, res, next) {
  try {
    await fetch(API + '/orders/' + req.params.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderFromForm(req.body)),
    });
    res.redirect('/orders?message=Commande modifiee');
  } catch (err) { next(err); }
});

// POST /orders/:id/delete : supprimer
router.post('/:id/delete', async function (req, res, next) {
  try {
    await fetch(API + '/orders/' + req.params.id, { method: 'DELETE' });
    res.redirect('/orders?message=Commande supprimee');
  } catch (err) { next(err); }
});

module.exports = router;