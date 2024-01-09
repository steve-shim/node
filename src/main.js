// @ts-check
// Formatting, Linting
// Formatting, Prettier
// Linting, ESLint
// Type checking: TypeScript

/* eslint-disable-next-line no-console */

const http = require('http')
const { routes } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    )

    console.log('route', route)
    if (!route) {
      res.statusCode = 404
      res.end('Not Found.')
      return
    }

    const regexResult = route.url.exec(req.url)
    if (!regexResult) {
      res.statusCode = 404
      res.end('Not Found.')
      return
    }

    const reqBody =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8')
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data))
            } catch {
              reject(new Error('Ill-formed json'))
            }
          })
        }))) ||
      undefined

    console.log('reqBody', reqBody)

    const result = await route.callback(regexResult, reqBody)
    res.statusCode = result.statusCode

    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(result.body))
    }
  }

  main()
})

const PORT = 4000
server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})

// setInterval(() => {
//   console.log('Hey!')
//   while (true) {}
// }, 1000)

// function and(x) {
//   return function print(y) {
//     return `${x} and ${y}`
//   }
// }

// const saltAnd = and('salt')
// console.log(saltAnd('pepper'))
// console.log(saltAnd('sugar'))

// const waterAnd = and('water')
// console.log(waterAnd('juice'))

// let numCounters = 0
// function getCounter() {
//   numCounters += 1
//   const result = {
//     count,
//     total: 0,
//   }

//   function count() {
//     result.total += 1
//   }

//   return result
// }

// const counterA = getCounter()
// counterA.count()
// counterA.count()

// const counterB = getCounter()
// counterB.count()

// console.log(counterA.total, counterB.total, numCounters)
