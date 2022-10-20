/* eslint-disable promise/valid-params */

const express = require('express')
const { log } = require('node:console')

const router = express.Router()

const fsPromises = require('node:fs/promises')
const { stringify } = require('node:querystring')

router.get('/:id', (req, res) => {
  fsPromises
    .readFile('./data.json', 'utf-8')

    .then((a) => {
      const id = req.params.id
      let movieObject = JSON.parse(a).horrorMovies.find((pic) => pic.id === +id)

      res.render('details', movieObject)
    })
    .catch()
})

router.get('/:id/edit', (req, res) => {
  fsPromises
    .readFile('./data.json', 'utf-8')

    .then((a) => {
      const id = req.params.id
      let movieObject = JSON.parse(a).horrorMovies.find((pic) => pic.id === +id)

      res.render('edit', movieObject)
    })
    .catch()
})

router.post('/:id/edit', (req, res) => {
  fsPromises
    .readFile('./data.json', 'utf-8')

    .then((dataset) => {
      const id = req.params.id
      const newComments = req.body.comments
      const movieData = JSON.parse(dataset)
      const newRating = req.body.rating
      console.log(req.body)
      let movieObject = movieData.horrorMovies.find((pic) => pic.id == id)

      const index = movieData.horrorMovies.indexOf(movieObject)
      const ratingsArray = movieObject.rating.ratings

      if (newRating != null) {
        ratingsArray.push(+newRating)
        movieObject.rating.averageRating =
          ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length
      }

      if (newComments != '') {
        movieObject.comments.push(newComments)
      }

      movieData.horrorMovies.splice(index, 1, movieObject)

      return fsPromises.writeFile(
        './data.json',
        JSON.stringify(movieData, null, 2)
      )
    })
    .then(() => {
      res.redirect('/movie/' + req.params.id)
    })
    .catch()
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

router.get('/random', (req, res) => {
  let page = getRandomInt(7)
  res.redirect('/movie/' + page)
})

module.exports = router
