const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Students = require('../models/student');

const studentRouter = express.Router();
studentRouter.use(bodyParser.json());

// Methods for http://localhost:3000/students/ API end point
studentRouter.route('/')
.get((req, res, next) => {
    Students.find(req.query)
    .then((students) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(students);
    })
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Students.create(req.body)
    .then((student) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /students');
})
.delete((req, res, next) => {
    Students.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/students/:studentId API end point
studentRouter.route('/:studentId')
.get((req, res, next) => {
    Students.findById(req.params.studentId)
    .then((student) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /students/${req.params.studentId}`);
})
.put((req, res, next) => {
    Students.findByIdAndUpdate(req.params.studentId, {
        $set: req.body
    }, { new: true })
    .then((student) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Students.findByIdAndRemove(req.params.studentId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) =>res.json({err:err}));
});

module.exports = studentRouter;