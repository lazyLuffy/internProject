 const authtoken =require('../Auth/oauth')
const express = require('express');
const router = express.Router();
const {create,login} = require('../controller/regisControl');
// router.use(express.json());

router.post('/',create);
router.post('/login',authtoken,login);

module.exports = router;