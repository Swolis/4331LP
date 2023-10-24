// api.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/todo')

router.get('/todos', (req, res, next) => {
    // get placeholder
});

router.post('/todos', (req, res, next) => {
    // post placeholder
});

router.delete('/todos/:id', (req, res, next) =>  {
    // delete placeholder
});

module.exports = router;