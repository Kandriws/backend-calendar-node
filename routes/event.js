const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidatorMiddleware');
const { jwtValidateMiddleware } = require('../middlewares/jwtValidatorMiddleware');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { isDate } = require('../helpers/isDate');
const { validateEventDates } = require('../helpers/validateEventDates');
const { validateEventDatesMiddleware } = require('../middlewares/validateEventDatesMiddleware');

const router = Router();

router.use(jwtValidateMiddleware);

router.get('/', getEvents);

router.post('/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        validateEventDatesMiddleware,
        fieldsValidator
    ],
    createEvent);

router.put('/:id', [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateEventDatesMiddleware,
    fieldsValidator
], updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;