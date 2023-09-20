import express from 'express'
import cors from 'cors'

require('dotenv').config()
const cookieParser = require("cookie-parser");
const {AppDataSource} = require('./config/ormconfig')
const errorMiddleWare = require('./middlewares/error-middleware')
const userRouter = require('./users/routes/index')
const fileRouter = require('./files/routes/index')
const companyRouter = require('./company/routes/index')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({credentials: true, origin: true}))
app.use('/users', userRouter)
app.use('/file', fileRouter)
app.use('/company', companyRouter)
app.use(errorMiddleWare)
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})