const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');

router.get('/',  tagController.getAllTags);
router.get('/:tagId', tagController.getTagById);
router.post('/', tagController.createTag);
router.put('/:tagId', tagController.updateTag);
router.delete('/:tagId', tagController.deleteTag);

module.exports = router;

