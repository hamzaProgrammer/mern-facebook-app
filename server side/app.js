const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
require('./db/conn')
const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

// adding routes
app.use(require('./routes/authRoutes'))
app.use(require('./routes/UserRoutes'))
app.use(require('./routes/PostsRoutes'))
//app.use(require('./routes/ListRoutes'))
//app.use(require('./routes/AdminRoutes'))

app.listen(port, (req, res) => {
    console.log(`Express Server Running at ${port}`)
})