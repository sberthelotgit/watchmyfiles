const {Router} = require('express');
const {File} = require('../models/file');

const router = new Router();

router.get('/', async (req, res) => {
    const query = File.find({},'-_id -apiCalled -__v').sort('fileName');
    const result = await query.exec();
    res.status(200).send(result);
});

module.exports = router;