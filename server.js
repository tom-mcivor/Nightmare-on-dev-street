/* eslint-disable promise/valid-params */
const express = require('express')
const hbs = require('express-handlebars')

// const hbs = require('express-handlebars')


const movieRoutes = require('./route')

const fsPromises = require('node:fs/promises')

const server = express()



// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

server.get('/', (req, res) => {


  fsPromises.readFile('./data.json','utf-8')
  .then( a => res.render('home', JSON.parse(a)))
  .catch()

})

server.use('/movie', movieRoutes)









module.exports = server


// server.use('/data', otterRoutes)
// res.render('home')
// res.render('sceenshot')

// res.send(data)
// res.sendFile(path.resolve('./public/silvia.html'))
