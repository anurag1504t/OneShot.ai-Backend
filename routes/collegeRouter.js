const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Colleges = require('../models/college');

const collegeRouter = express.Router();
collegeRouter.use(bodyParser.json());

// Methods for http://localhost:3000/colleges/ API end point
collegeRouter.route('/')
.get((req, res, next) => {
    Colleges.find(req.query)
    .then((colleges) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(colleges);
    })
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Colleges.create(req.body)
    .then((college) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(college);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /colleges');
})
.delete((req, res, next) => {
    Colleges.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

// Methods for http://localhost:3000/colleges/:collegeId API end point
collegeRouter.route('/:collegeId')
.get((req, res, next) => {
    Colleges.findById(req.params.collegeId)
    .then((college) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(college);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /colleges/${req.params.collegeId}`);
})
.put((req, res, next) => {
    Colleges.findByIdAndUpdate(req.params.collegeId, {
        $set: req.body
    }, { new: true })
    .then((college) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(college);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Colleges.findByIdAndRemove(req.params.collegeId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) =>res.json({err:err}));
});

module.exports = collegeRouter;