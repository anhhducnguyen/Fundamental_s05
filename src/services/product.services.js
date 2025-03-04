const db = require('../config/database');

module.exports.getAllProducts = async function () {
    
    try {
        let result = await db('products as p')
        .join('listings as l', "l.product_id", 'p.id')
        .select('p.*', 'l.*')
        // Transform - Chuyển đổi dữ liệu
        result = result.map(function (el, index) {
            return {
                id: el.id, 
                productName: el.productName, 
                status: el.status,
                listing: {
                    description: el.description,
                    price: el.price,
                    rate: el.rate,
                },
            };
        });
        
        
        return result;
    } catch (error) {
        error;
    }
};
