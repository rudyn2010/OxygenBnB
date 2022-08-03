const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

const router = express.Router();

router.get('/current', requireAuth, async (req, res, next) => {
    const currentId = req.user.id
    const spotsOfCurrentUser = await Spot.findAll({
        where: {
            ownerId: currentId
        }
    })
    res.json(spotsOfCurrentUser);
});

router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;
    const spotDetailsId = await Spot.findByPk(spotId);

    if (!spotDetailsId) {
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    } else {
        return res.json(spotDetailsId);
    };
});

router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll();
    res.json({
        "Spots": allSpots
    });
});

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

//Post an Image to a Spot based on the Spot's ID
//my code here
router.post('/:spotId/images', requireAuth, async (req, res, next) => {


    res.json();
});

//----------------------------------------------

router.post('/', validateSpot, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;

    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      })

    return res.json(newSpot)
});

//Edit a Spot
router.put('/:spotId', validateSpot, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { spotId } = req.params;

    const spotById = await Spot.findByPk(spotId);
    //{ where: { ownerId: req.user.id }}
    if (!spotById) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else if (spotById.ownerId !== req.user.id) {
        res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else {
        spotById.address = address;
        spotById.city = city;
        spotById.state = state;
        spotById.country = country;
        spotById.lat = lat;
        spotById.lng = lng;
        spotById.name = name;
        spotById.description = description;
        spotById.price = price;

        await spotById.save();
        return res.json(spotById);
    };
});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;

    const spotToDelete = await Spot.findByPk(spotId);

    if (!spotToDelete) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    } else if (spotToDelete.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    } else {
        await spotToDelete.destroy()
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    };
});

module.exports = router;
