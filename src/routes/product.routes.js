const express = require('express');
const router = express.Router();
const userController = require('../controllers/product.controller');
const productMiddleware = require('../middlewares/product.middleware');

router.get('/', userController.mergeProductAndListing);
// router.get('/', productMiddleware, userController.getAllProduct);
router.get('/:id', userController.getProductById);
router.get('/:id/listing', userController.getListingById);
router.get('/:id/tags', userController.getTagsById);
router.post('/', userController.createProduct);
router.post('/:id/comments', userController.createComment);
router.put('/:id', userController.updateProduct);
router.delete('/:id', userController.deleteProduct);

module.exports = router;
