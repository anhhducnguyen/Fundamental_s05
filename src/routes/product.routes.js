const express = require('express');
const router = express.Router();
const userController = require('../controllers/product.controller');
const productMiddleware = require('../middlewares/product.middware');

// get_all: http://localhost:3000/api/v1/products/?minRate=2&maxRate=4&sort=id&order=asc?page=1&limit=1
// get_one: http://localhost:3000/api/v1/products/3
// get_listing: http://localhost:3000/api/v1/products/3/listing
// post_create: http://127.0.0.1:3000/api/v1/products

// {
//     "productName": "Gaming Laptop",
//     "status": true,
//     "listing": {
//         "description": "High-end gaming laptop with RTX 3080",
//         "price": 2500,
//         "rate": 4.5
//     }
// }

// post_comment: http://127.0.0.1:3000/api/v1/products/1/comments

// {
//     "content": "Cũng okla đó"
// }

// put_product: http://localhost:3000/api/v1/products/1

// {
//     "productName": "Updated Gaming Laptop",
//     "status": true
// }

// delete_product: http://localhost:3000/api/v1/products/1

router.get('/', productMiddleware, userController.getAllProduct);
router.get('/:id', userController.getProductById);
router.get('/:id/listing', userController.getListingById);
router.get('/:id/tags', userController.getTagsById);
router.post('/', userController.createProduct);
router.post('/:id/comments', userController.createComment);
router.put('/:id', userController.updateProduct);
router.delete('/:id', userController.deleteProduct);


module.exports = router;
