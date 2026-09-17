const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const requiredAuth = require('../middleware/auth');
const userModel = require('../models/userModel');

router.post('/register', authController.register);
router.post('/login', authController.login);

// A protected example route, proving requiredAuth actually works
router.get('/profile', requiredAuth, async (req, res, next) => {
    try {
        const user = await userModel.getUserById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;