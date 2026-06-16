var express = require('express');
var router = express.Router();

const API = 'http://localhost:9001/payments';

function paymentFromForm(body) {
  const payment = { orderId: body.orderId };
  if (body.amount) payment.amount = Number(body.amount);
  if (body.paymentDate) payment.paymentDate = body.paymentDate;
  if (body.paymentMethod) payment.paymentMethod = body.paymentMethod;
  if (body.status) payment.status = body.status;
  return payment;
}

// GET /payments
router.get('/', async function (req, res, next) {
  try {
    const response = await fetch(API + '/payments');
    const payments = await response.json();
    res.render('payments', { payments: payments, message: req.query.message });
  } catch (err) { next(err); }
});

// GET /payments/new
router.get('/new', function (req, res) {
  res.render('payment-new');
});

// POST /payments
router.post('/', async function (req, res, next) {
  try {
    await fetch(API + '/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentFromForm(req.body)),
    });
    res.redirect('/payments?message=Paiement ajoute');
  } catch (err) { next(err); }
});

// GET /payments/:id
router.get('/:id', async function (req, res, next) {
  try {
    const response = await fetch(API + '/payments/' + req.params.id);
    const payment = await response.json();
    res.render('payment', { payment: payment });
  } catch (err) { next(err); }
});

// GET /payments/:id/edit
router.get('/:id/edit', async function (req, res, next) {
  try {
    const response = await fetch(API + '/payments/' + req.params.id);
    const payment = await response.json();
    res.render('payment-edit', { payment: payment });
  } catch (err) { next(err); }
});

// POST /payments/:id/edit : modifier
router.post('/:id/edit', async function (req, res, next) {
  try {
    await fetch(API + '/payments/' + req.params.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentFromForm(req.body)),
    });
    res.redirect('/payments?message=Paiement modifie');
  } catch (err) { next(err); }
});

// POST /payments/:id/delete : supprimer
router.post('/:id/delete', async function (req, res, next) {
  try {
    await fetch(API + '/payments/' + req.params.id, { method: 'DELETE' });
    res.redirect('/payments?message=Paiement supprime');
  } catch (err) { next(err); }
});

module.exports = router;
