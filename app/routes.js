const express = require('express');

const router = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const documentController = require('./controllers/documentController');


router.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});


// auth Routes:
router.get('/', guestMiddleware, authController.signin);
router.get('/signup', guestMiddleware, authController.signup);
router.get('/signout', authController.signout);
router.post('/auth/register', authController.register);
router.post('/auth/authenticate', authController.authenticate);


router.use('/app', authMiddleware);
router.get('/app/dashboard', dashboardController.index);


router.post('/app/projects', projectController.new);
router.get('/app/projects/:id', projectController.show);
router.delete('/app/projects/:id', projectController.destroy);

router.post('/app/projects/:projectId/documents/create', documentController.store);
router.get('/app/projects/:projectId/documents/:documentId', documentController.destroy);

router.use((req, res) => res.status(404).send('Rota nao encontrada'));

router.use((err, req, res, _next) => {
  const status = err.status || 500;
  const error = process.env.NODE_ENV === 'production' ? {} : err;
  res.send({
    status,
    error: err.message,
    stack: error,
  });
});

module.exports = router;
