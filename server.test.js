const request = require('supertest')

const { screen } = require('@testing-library/dom')
const server = require('./server')

require('@testing-library/jest-dom')

describe('GET /', () => {
  test('Title on homepage', () => {
    return request(server)
      .get('/')
      .then((res) => {
        document.body.innerHTML = res.text
        const homeTitle = screen.getAllByRole('heading')
        expect(homeTitle[0]).toHaveTextContent('Classic Horror Movies')
      })
  })
  test('Navigation has home', () => {
    return request(server)
      .get('/')
      .then((res) => {
        document.body.innerHTML = res.text
        const nav = screen.getAllByRole('navigation')
        expect(nav).toHaveTextContent('Home')
      })
  })
})

describe('GET /movies', () => {
  test('Check picture is displayed', () => {
    return request(server)
      .get('/movies/1')
      .then((res) => {
        document.body.innerHTML = res.text
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('src')
      })
  })
  test('Check movie title is displayed', () => {
    return request(server)
      .get('/movies/2')
      .then((res) => {
        document.body.innerHTML = res.text
        const movieName = screen.getByRole('heading')
        expect(movieName[0]).toHaveAttribute('The Cure of Frankenstein')
      })
  })
  test('Check movie director is displayed', () => {
    return request(server)
      .get('/movies/3')
      .then((res) => {
        document.body.innerHTML = res.text
        const movieDirector = screen.getByRole('heading') //check this role
        expect(movieDirector[1]).toHaveAttribute('William Friedkin')
      })
  })
  test('Check movie year is displayed', () => {
    return request(server)
      .get('/movies/4')
      .then((res) => {
        document.body.innerHTML = res.text
        const movieYear = screen.getByRole('heading') //check this role
        expect(movieYear[2]).toHaveAttribute('1980')
      })
  })
})
