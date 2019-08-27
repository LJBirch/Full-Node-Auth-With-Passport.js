const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// Setup View Engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))
app.get('/auth/register', (req, res) => res.render('register'))

app.post('/auth/register', (req, res) => res.send('Register!'))

app.listen(PORT, () =>
  console.log(`Server is up and listening on port: ${PORT}`)
)
