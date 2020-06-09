var express = require('express');
var router = express.Router();
const WordsTresureController = require('../Controllers/wordsTreasures');
//---------post routes------
router.post('/addTerm', WordsTresureController.create);
router.post('/test', async (req, res) => await res.send(req.body))
//---------get routes------
router.get('/getTerm', WordsTresureController.get);
router.get('/test', (req, res) => res.send("Reached SuccessFully"))
//---------put routes------
router.put('/updateTerm/:termId', WordsTresureController.update);
//----------------delete routes------------------------------
router.delete('/deleteTerm/:termId', WordsTresureController.deleteTerm);

module.exports = router;
