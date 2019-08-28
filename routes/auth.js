const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

/* Auth Routes */

// Register GET Route
router.get('/register', (req, res) => {
  res.render('register')
})

// Register POST Route
router.post('/register', async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body
  let errors = []

  // Check required fields
  if (!name || !email || !password || !passwordConfirm) {
    errors.push({ msg: 'Please fill in all fields.' })
  }

  // Check passwords match
  if (password !== passwordConfirm) {
    errors.push({ msg: 'Password do not match.' })
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters.' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors
    })
  } else {
    try {
      // Validation passed
      const user = await User.findOne({ email })

      if (user) {
        // User exists
        errors.push({ msg: 'Email is already registered.' })
        res.render('register', {
          errors
        })
      } else {
        const newUser = new User({ name, email, password })

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newUser.password, salt)

        // Set password to hash
        newUser.password = hash
        await newUser.save()

        res.redirect('/auth/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
})

// Login GET Route
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router
