const mongoose = require('mongoose')
const MONGOURI =
  process.env.MONGOURI || 'mongodb://127.0.0.1:27017/node-auth-dev'

mongoose
  .connect(MONGOURI, { useNewUrlParser: true })
  .then(console.log('Successfully connected to MongoDB.'))
  .catch(error => handleError(error))
