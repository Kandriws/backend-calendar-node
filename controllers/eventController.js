const { response } = require('express');
const Event = require('../models/EventModel');


const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    });
}

const createEvent = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;

        const eventSaved = await event.save();

        res.status(201).json({
            ok: true,
            event: eventSaved
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error to create event',
        });
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;

    try {

        let event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exists'
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You can not edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: updatedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error to update event',
        });
    }
}

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;

    try {

        let event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exists'
            });
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You can not edit this event'
            });
        }

        const updatedEvent = await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            msg: 'Event deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error to delete event',
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}