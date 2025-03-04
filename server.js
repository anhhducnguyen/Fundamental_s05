const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');

const userRoutes = require('./src/routes/user.routes');
const productRoutes = require('./src/routes/product.routes');
const commentRoutes = require('./src/routes/comment.routes');
const tagRoutes = require('./src/routes/tag.routes');

const app = express()
const port = 3000

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/tags', tagRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API!'
    })
})

app.use((req, res) => {
    res.status(404).json({
        message: 'Page not found'
    });
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})