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
        expect(movieName[1]).toHaveTextContent('The Curse of Frankenstein')
      })
  })
  test('Check movie director is displayed', () => {
    return request(server)
      .get('/movie/3')
      .then((res) => {
        document.body.innerHTML = res.text
        const movieDirector = screen.getAllByRole('heading')
        expect(movieDirector[2]).toHaveTextContent('William Friedkin')
        console.log('heading')
      })
  })
  test('Check movie year is displayed', () => {
    return request(server)
      .get('/movie/4')
      .then((res) => {
        document.body.innerHTML = res.text
        const movieYear = screen.getAllByRole('heading')
        expect(movieYear[3]).toHaveTextContent('1980')
      })
  })
  test('Check link to rating page', () => {
    return request(server)
      .get('/movie/5')
      .then((res) => {
        document.body.innerHTML = res.text
        const ratePage = screen.getAllByRole('link')
        expect(ratePage[1]).toHaveTextContent('Rate')
      })
  })
  test('Check comments are displayed', () => {
    return request(server)
      .get('/movie/6')
      .then((res) => {
        document.body.innerHTML = res.text
        const commentsTitle = screen.getAllByRole('heading')
        expect(commentsTitle[4]).toHaveTextContent('Comments:')
      })
  })
  test('Check comments for the movie are displayed', () => {
    return request(server)
      .get('/movie/7')
      .then((res) => {
        document.body.innerHTML = res.text
        const commentsList = screen.getAllByRole('listitem')
        expect(commentsList[0]).toHaveTextContent(
          "It opens with an insidiously brilliant update of Psycho's shower scene and ends with a jump scare that Hitchcock would have envied; in between, it's merely the tenderest and most affecting movie ever made out of one of King's novels."
        )
      })
  })
})

describe('GET /movie/:id/edit', () => {
  test('Check picture is displayed', () => {
    return request(server)
      .get('/movie/1')
      .then((res) => {
        document.body.innerHTML = res.text
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('src')
      })
  })
})
