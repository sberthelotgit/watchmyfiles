const {Router} = require('express');
const {File} = require('../models/file');

const router = new Router();

router.get('/', async (req, res) => {
    const query = File.find().select('fileName folder');
    const result = await query.exec();
    res.status(200).send(result);
});

module.exports = router;