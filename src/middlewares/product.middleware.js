module.exports = (req, res, next) => {
    req.queryOptions = {};

    // 1. **Filter - Kiểm tra minRate và maxRate**
    if (req.query.minRate !== undefined || req.query.maxRate !== undefined) {
        const minRate = parseFloat(req.query.minRate);
        const maxRate = parseFloat(req.query.maxRate);

        if (isNaN(minRate) || isNaN(maxRate) || minRate < 0 || maxRate > 5 || minRate > maxRate) {
            return res.status(400).json({ 
                message: "Invalid rate queries. minRate and maxRate must be between 0 and 5.",
                minRate, maxRate
            });
        }

        req.queryOptions.minRate = minRate;
        req.queryOptions.maxRate = maxRate;
    }

    // 2. **Sort - Kiểm tra sắp xếp**
    const allowFields = ['id', 'productName', 'status', 'listing_price'];
    const allowOrders = ['asc', 'desc'];

    if (req.query.sort || req.query.order) {
        if (!req.query.sort || !req.query.order) {
            return res.status(400).json({ 
                message: "Both sort and order queries must be provided together.", 
                requiredFields: ['sort', 'order']
            });
        }

        if (!allowFields.includes(req.query.sort) || !allowOrders.includes(req.query.order.toLowerCase())) {
            return res.status(400).json({ 
                message: "Invalid sorting field or order.",
                validFields: allowFields,
                validOrders: allowOrders
            });
        }

        req.queryOptions.sort = req.query.sort;
        req.queryOptions.order = req.query.order.toLowerCase();
    }

    // 3. **Pagination - Kiểm tra page và limit**
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if ((req.query.page !== undefined && (isNaN(page) || page <= 0)) || 
        (req.query.limit !== undefined && (isNaN(limit) || limit <= 0))) {
        return res.status(400).json({ 
            message: "Invalid pagination queries. Page and limit must be positive integers.", 
            page, limit
        });
    }

    req.queryOptions.page = page || 1;
    req.queryOptions.limit = limit || 10;

    next();
};
