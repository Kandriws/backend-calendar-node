const { validateEventDates } = require("../helpers/validateEventDates");

const validateEventDatesMiddleware = (req, res, next) => {
    const { start, end } = req.body;
    if (!validateEventDates(start, end)) {
        return res.status(400).json({
            ok: false,
            msg: 'End date must be greater than start date'
        });
    }
    next();
}

module.exports = {
    validateEventDatesMiddleware
}