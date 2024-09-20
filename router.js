let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('i am router');
})

router.get('/login', (req, res) => {
    res.send('login success');
})

module.exports = router;