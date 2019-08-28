const express = require('express')
const app = express()
const session = require('express-session')

// Setup enviroment variables
require('dotenv').config()

// Connect to MongoDB
require('./database/mongoose')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

// Auth Routes
app.use('/auth', require('./routes/auth'))

app.get('/', (req, res) => res.render('index'))

// Setup port and listen
const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
  console.log(`Server is up and listening on port: ${PORT}`)
)
