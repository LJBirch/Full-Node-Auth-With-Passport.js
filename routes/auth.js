const express = require('express')
const router = express.Router()
const User = require('../models/User')

/* Auth Routes */

// Register GET Route
router.get('/register', (req, res) => {
  res.render('register')
})

// Register POST Route
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.redirect('/')
  } catch (error) {
    console.log('Error: ', error)
  }
})

module.exports = router
