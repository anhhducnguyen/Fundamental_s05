const Product = require('../models/product.model');

exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.getAll(req.queryOptions);
        res.json({ 
            message: 'Get all products successfully',
            "data": products
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const products = await Product.getById(req.params.id);
        if (!products) return res.status(404).json({
            message: 'Product not found'
        })
        res.json({ 
            message: 'Get one products successfully',
            "data": products
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getListingById = async (req, res) => {
    try {
        const listing = await Product.getListing(req.params.id);
        if (!listing) return res.status(404).json({
            message: 'Listing not found'
        })
        res.json({ 
            message: 'Get listing successfully',
            "data": listing
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getTagsById = async (req, res) => {
    try {
        const tags = await Product.getTags(req.params.id);
        if (!tags) return res.status(404).json({
            message: 'Tags not found'
        })
        res.json({ 
            message: 'Get tags successfully',
            "data": tags
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getCommentsById = async (req, res) => {
    try {
        const comments = await Product.getComments(req.params.id);
        if (!comments) return res.status(404).json({
            message: 'Comments not found'
        })
        res.json({ 
            message: 'Get comments successfully',
            "data": comments
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { productName, status, listing } = req.body;
        const exitstingProduct = await Product.findByName(productName);

        if (exitstingProduct) {
            return res.status(400).json({ 
                message: 'Product already exists' 
            });
        }

        const newProduct = await Product.createProduct({ productName, status });

        if (listing) {
            await Product.createListing(newProduct.id, listing);
        }

        res.status(200).json({ 
            message: 'Create successfully',
        })
    } catch (error) {
        console.error("Error while creating:", error);
        res.status(500).json({ message: 'Error while creating', error });
        
    }
}

exports.createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const id = req.params.id;

        const existsProduct = await Product.findById(id);

        if (!existsProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.createComment(id, content);
        
        res.status(200).json({ 
            message: 'Create comment successfully', 
        });
        
    } catch (error) {
        console.error("Error while creating comment", error);
        res.status(500).json({ message: 'Error while creating comment', error });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const { productName, status } = req.body;

        const exitsProduct = await Product.findById(id);

        if (!exitsProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.updateProduct(id, { productName, status });

        res.status(200).json({ 
            message: 'Update successfully' 
        });
    } catch (error) {
        console.error("Error while updating:", error);
        res.status(500).json({ message: 'Error while updating', error });
    }
}

exports.deleteProduct = (req, res) => {
    try {
        const id = req.params.id;
    
        Product.deleteProduct(id);
        
        res.status(200).json({ 
            message: 'Delete successfully' 
        });
    } catch (error) {
        console.error("Error while deleting:", error);
        res.status(500).json({ message: 'Error while deleting', error });
    }
}