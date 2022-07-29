// backend/routes/api/session.js - Phase 4
const express = require('express')

//Phase 4 - User Login API ROUTE
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

//Phase 5 -Import check functions we created
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//Phase 5 - middleware to check these keys and validate them
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

const router = express.Router();

//Test

// Phase 4 - Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
        user
    });
});

//Phase 4: User Logout API Route
// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

// Phase 4 - Restore session user
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
});

module.exports = router;
