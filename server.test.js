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
        const homeNav = screen.getByRole('navigation')
        expect(homeNav).toHaveTextContent('Home')
      })
  })
})

describe('GET /movie', () => {
  test('Check picture is displayed', () => {
    return request(server)
      .get('/movie/1')
      .then((res) => {
        document.body.innerHTML = res.text
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('src')
      })
  })
  test('Check movie title is displayed', () => {
    return request(server)
      .get('/movie/2')
      .then((res) => {
        document.body.innerHTML = res.text
        const movieName = screen.getAllByRole('heading')
        expect(movieName[0]).toHaveAttribute('The Cure of Frankenstein')
      })
  })
  test('Check movie director is displayed', () => {
    return request(server)
      .get('/movie/3')
      .then((res) => {
        document.body.innerHTML = res.text
        const movieDirector = screen.getAllByRole('heading') //check this role
        expect(movieDirector[1]).toHaveAttribute('William Friedkin')
      })
  })
  test('Check movie year is displayed', () => {
    return request(server)
      .get('/movie/4')
      .then((res) => {
        document.body.innerHTML = res.text
        const movieYear = screen.getAllByRole('heading') //check this role
        expect(movieYear[2]).toHaveAttribute('1980')
      })
  })
})
