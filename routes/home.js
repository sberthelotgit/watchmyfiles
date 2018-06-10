const express = require('express');

const routeur = new express.Router();

// Get home
routeur.get('/', (req, res) => {
    res.send(`Welcome to Watch my file api, Use /api/files to list your network files`);
});

module.exports = routeur;