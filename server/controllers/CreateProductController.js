// CreateProductController.js

const express = require('express');

function createProduct(req, res){
    const productData = req.body;

    // check that each field was entered 
    for(const field in productData)
    {
        if(!productData[field])
        {
            return res.status(400).json({ error: `Field '${field}' is required.` });
        }
    }
}