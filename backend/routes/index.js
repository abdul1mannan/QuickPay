const router = require('express').Router();
const userRoutes = require('./user');
const accountRoutes = require('./account');
const authRoutes = require('./auth');
router.use('/users', userRoutes);
router.use('/account', accountRoutes);
router.use('/auth', authRoutes);

module.exports = router;