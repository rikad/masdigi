const express = require('express')
const app = express()
const ip = 'localhost'
const port = 3000
const path = require('path');
const publicPath = path.join(__dirname,'public')

app.use(express.static(publicPath))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
