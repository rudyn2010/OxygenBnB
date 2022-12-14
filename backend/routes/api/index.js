/* All the API routes will be served at URL's starting with /api/. */

// backend/routes/api/index.js
const router = require('express').Router();

//Phase 4
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

//For future routers spotsRouter('ex file location')
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')
const bookingsRouter = require('./bookings.js')
const imagesRouter = require('./images.js')

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

//Phase 4
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

//For future imports:
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/images', imagesRouter);


//p2p0: Comment test dont need need it! Made it CSRF Protection on the Frontend!
// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

// //Test the restoreUser middleware and check whether or not the req.user has been populated by the middleware properly
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// //Test
// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// //TEST - API router
// // backend/routes/api/index.js
// // ...
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });
// // ...

// //Test
// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });
// // ...

module.exports = router;
