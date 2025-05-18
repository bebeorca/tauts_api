const express = require('express');
const router = express.Router();
const linkController = require('../controllers/link.controller.js')
const auth = require('../middleware/auth.js');

router.get('/:user_id', linkController.getLinks)
router.post('/create', auth, linkController.createLink);
router.put('/update/:id', auth, linkController.updateLink);
router.delete('/delete/:id', auth, linkController.deleteLink);

module.exports = router;