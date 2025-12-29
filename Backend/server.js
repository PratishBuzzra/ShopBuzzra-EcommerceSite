require('dotenv').config();
const express = require('express')
const connectToDB = require('./Database/db')
const morgan = require('morgan')
const cors = require('cors')
const authRoutes = require('./routes/authRoute')
const productRoutes = require('./routes/productRoute')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')


const app = express()

const PORT = process.env.PORT || 3000

//connecttodb
connectToDB();

//middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))


//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/cart',cartRoutes )
app.use('/api/v1/orders', orderRoutes)


//restapi
app.get('/', (req, res)=>{
   res.send('<h1>welcome to ecommerce</h1>')

})


app.listen(PORT, ()=>{
    console.log(`Server is now running on port ${PORT}`);
    
})


