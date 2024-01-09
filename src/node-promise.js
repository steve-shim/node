const fs = require('fs')

// fs.readFile('.gitignore', 'utf-8', (error, value) => {
//   console.log(value)
// })

function readFileInPromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile('.gitignore', 'utf-8', (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}

// readFileInPromise('.gitignore').then((value) => console.log(value))

fs.promises.readFile('.gitignore', 'utf-8').then((value) => console.log(value))
