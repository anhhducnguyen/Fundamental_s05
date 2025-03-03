const { query } = require("express");

module.exports = (req, res, next) => {
    req.queryOptions = {};

    if (req.query.minRate) {       
        req.queryOptions.minRate = parseFloat(req.query.minRate);
    }
    
    if (req.query.maxRate) {
        req.queryOptions.maxRate = parseFloat(req.query.maxRate);
    }

    const allowFilelds = ['id', 'productName', 'status', 'listing_price'];
    const allowOrders = ['asc', 'desc'];

    if (req.query.sort && req.query.order) {
        if (allowFilelds.includes(req.query.sort) && allowOrders.includes(req.query.order.toLowerCase())) {
            req.queryOptions.sort = req.query.sort;
            req.queryOptions.order = req.query.order.toLowerCase();
        }
    }

    req.queryOptions.page = parseInt(req.query.page) || 1;
    req.queryOptions.limit = parseInt(req.query.limit) || 10;
    
    next();
}