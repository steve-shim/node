// @ts-check
// Formatting, Linting
// Formatting, Prettier
// Linting, ESLint
// Type checking: TypeScript

/* eslint-disable-next-line no-console */

const http = require('http')

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post} */
const exPost = {
  id: 'abc',
  title: 'abc',
  content: 'abc',
}

/** @type {Post[]} */
const posts = [
  {
    id: '12',
    title: 'My first post',
    content: 'Hello!',
  },
  {
    id: '123',
    title: 'My second post',
    content: 'Hello2!',
  },
]

const server = http.createServer((req, res) => {
  console.log(req.url)
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined

  if (req.url === '/posts' && req.method === 'GET') {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(result))
    // /^\/posts\/[a-zA-Z0-9-_]+$/.test(req.url)
  } else if (postIdRegexResult && req.method === 'GET') {
    // Get /posts/:id
    const postId = postIdRegexResult[1]
    console.log('postId', postId)

    const post = posts.find((_post) => _post.id === postId)

    if (post) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(post))
    } else {
      res.statusCode = 404
      res.end('Post Not found')
    }
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.setEncoding('utf-8')
    req.on('data', (data) => {
      console.log(typeof data) // string
      const body = JSON.parse(data)
      console.log(body)
      posts.push({
        id: body.title.toLowerCase().replace(/\s/g, '_'),
        title: body.title,
        content: body.content,
      })
    })

    res.statusCode = 200
    res.end('create post')
  } else {
    res.statusCode = 404
    res.end('Not found')
  }
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
