/* eslint-disable promise/valid-params */

const express = require('express')
const { log } = require('node:console')

const router = express.Router()

const fsPromises = require('node:fs/promises')




router.get('/:id', (req, res) => {

  fsPromises.readFile('./data.json','utf-8')

  .then( a => {

     const id = req.params.id
    let artvariable = JSON.parse(a).puppies.find(pic =>  pic.id === +id)

    res.render('details', artvariable)
  
  
  })
  .catch()

})


router.get('/:id/edit', (req, res) => {

  fsPromises.readFile('./data.json','utf-8')

  .then( a => {

console.log(a);

     const id = req.params.id
    let artvariable = JSON.parse(a).puppies.find(pic =>  pic.id === +id)

    res.render('edit', artvariable)
  
  })
  .catch()
})



router.post('/:id/edit', (req, res) => {

  fsPromises.readFile('./data.json','utf-8')

  .then( a => {

     const id = req.params.id
     
    let artvariable = JSON.parse(a).puppies.find(pic =>  pic.id === +id)

    res.render('details', artvariable)
  
  })
  .catch()
})



module.exports = router