const express = require('express');
const router = express.Router();
const pets = require('../controllers/pets');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validatePet } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Shelter = require('../models/shelter');

router.route('/')
    .get(catchAsync(shelters.index))
    .post(isLoggedIn, upload.array('image'), validateShelter, catchAsync(pets.createShelter))


router.get('/new', isLoggedIn, shelters.renderNewForm)

router.route('/:id')
    .get(catchAsync(shelters.showShelter))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateShelter, catchAsync(shelters.updateShelter))
    .delete(isLoggedIn, isAuthor, catchAsync(shelters.deleteShelter));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(shelters.renderEditForm))

module.exports = router;