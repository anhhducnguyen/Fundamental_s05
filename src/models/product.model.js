const db = require('../config/database');
const fs = require('fs');

class Product {
    static async getCommentsByProductIds(productIds) {
        try {
            const comments = await db('comments as c')
                .select('c.id as commentId', 'c.content', 'c.product_id')
                .whereIn('c.product_id', productIds);
    
            // Nhóm comments theo product_id
            const commentMap = {};
            comments.forEach(comment => {
                if (!commentMap[comment.product_id]) {
                    commentMap[comment.product_id] = [];
                }
                commentMap[comment.product_id].push({
                    commentId: comment.commentId,
                    content: comment.content
                });
            });
    
            return commentMap;
        } catch (error) {
            console.error("Error in getCommentsByProductIds:", error);
            throw error;
        }
    }
    
    static async getTagsByProductIds(productIds) {
        try {
            const tags = await db('tags as t')
                .select('t.id as tagId', 't.tagName', 'pt.product_id')
                .leftJoin('product_tags as pt', 'pt.tag_id', 't.id')
                .whereIn('pt.product_id', productIds);
    
            // Nhóm tags theo product_id
            const tagMap = {};
            tags.forEach(tag => {
                if (!tagMap[tag.product_id]) {
                    tagMap[tag.product_id] = [];
                }
                tagMap[tag.product_id].push({
                    tagId: tag.tagId,
                    tagName: tag.tagName
                });
            });
    
            return tagMap;
        } catch (error) {
            console.error("Error in getTagsByProductIds:", error);
            throw error;
        }
    }
    
    static async getAll(queryOptions = {}) {
        try {
            const page = queryOptions.page || 1;
            const limit = queryOptions.limit || 10;
            const offset = (page - 1) * limit;
    
            let query = db('products as p')
                .select(
                    'p.id', 'p.productName', 'p.status',
                    'l.description as listing_description', 
                    'l.price as listing_price', 
                    'l.rate as listing_rate'
                )
                .leftJoin('listings as l', 'l.product_id', 'p.id')
                .groupBy('p.id', 'p.productName', 'p.status', 'l.description', 'l.price', 'l.rate');
    
            // Lọc theo rating
            if (queryOptions.minRate) query.where('l.rate', '>=', queryOptions.minRate);
            if (queryOptions.maxRate) query.where('l.rate', '<=', queryOptions.maxRate);
    
            // Sắp xếp
            if (queryOptions.sort && queryOptions.order) {
                query.orderBy(queryOptions.sort, queryOptions.order);
            }
    
            // Áp dụng phân trang
            query.limit(limit).offset(offset);
    
            const products = await query;
    
            if (!products.length) return [];
    
            // Lấy danh sách comment và tags cho từng sản phẩm
            const productIds = products.map(p => p.id);
            const comments = await Product.getCommentsByProductIds(productIds);
            const tags = await Product.getTagsByProductIds(productIds);           
    
            return products.map(product => ({
                id: product.id,
                productName: product.productName,
                status: product.status,
                listing: {
                    description: product.listing_description || '',
                    price: product.listing_price || 0,
                    rate: product.listing_rate || 0
                },
                comments: comments[product.id] || [],
                tags: tags[product.id] || []
            }));
        } catch (error) {
            console.error("Error in getAll:", error);
            throw error;
        }
    }
    

    static async getById(id) {
        try {
            const product = await db('products as p')
                .select(
                    'p.id', 'p.productName', 'p.status',
                    'l.description as listing_description', 
                    'l.price as listing_price', 
                    'l.rate as listing_rate'
                )
                .leftJoin('listings as l', 'l.product_id', 'p.id')
                .where('p.id', id)
                .first();

            if (!product) return null;

            // Lấy comments và tags riêng
            const comments = await Product.getComments(id);
            const tags = await Product.getTags(id);

            return {
                id: product.id,
                productName: product.productName,
                status: product.status,
                listing: {
                    description: product.listing_description || '',
                    price: product.listing_price || 0,
                    rate: product.listing_rate || 0
                },
                comments,
                tags
            };
        } catch (error) {
            console.error("Error in getById:", error);
            throw error;
        }
    }

    static async getComments(productId) {
        try {
            return await db('comments as c')
                .select('c.id as commentId', 'c.content')
                .where('c.product_id', productId);
        } catch (error) {
            console.error("Error in getComments:", error);
            throw error;
        }
    }

    static async getTags(productId) {
        try {
            return await db('tags as t')
                .select('t.id as tagId', 't.tagName')
                .leftJoin('product_tags as pt', 'pt.tag_id', 't.id')
                .where('pt.product_id', productId);
        } catch (error) {
            console.error("Error in getTags:", error);
            throw error;
        }
    }
    
    static async findByName(productName) {
        try {
            return await db('products')
            .where('productName', productName)
            .first();
        } catch (error) {
            console.log('Error while finding product', error);
            throw error;            
        }
    } 

    static async createProduct({ productName, status }) {
        try {
            const [id] = await db('products').insert({ productName, status }).returning('id');
            return { id, productName, status };
        } catch (error) {
            console.log('Error inserting product', error);
            throw error;            
        }
    }

    static async createListing(productId, listing) {
        try {
            return await db('listings').insert({
                product_id: productId,
                description: listing.description,
                price: listing.price,
                rate: listing.rate
            });
        } catch (error) {
            console.log('Error inserting listings', error);
            throw error;
        }
    }

    static async addComment(productId, content) {
        try {
            return await db('comments').insert({
                product_id: productId,
                content
            });
        } catch (error) {
            console.log('Error inserting comments', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            return await db('products')
            .where('id', id)
            .first();
        } catch (error) {
            console.log('Error finding product', error);
            throw error;
        }
    }

    static async createComment(id, content) {
        try {
            return await db('comments').insert({
                product_id: id,
                content
            });
        } catch (error) {
            console.log('Error inserting comment', error);
            throw error;
        }
    }

    static async updateProduct(id, { productName, status }) {
        try {
            return await db('products')
            .where('id', id)
            .update({ productName, status });
        } catch (error) {
            console.log('Error updating product', error);
            throw error;
        }
    }

    static async deleteProduct(id) {
        try {
            await db('listings').where('product_id', id).delete();
            await db('comments').where('product_id', id).delete();
            await db('product_tags').where('product_id', id).delete();
            return await db('products').where('id', id).delete();
        } catch (error) {
            console.log('Error while deleting product', error);
            throw error;            
        }
    }
}

module.exports = Product;
