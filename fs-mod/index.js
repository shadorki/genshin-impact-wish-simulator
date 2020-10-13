const fs = require('fs')
const util = require('util')
const p = require('path')
const readdir = util.promisify(fs.readdir);
const path = p.join(__dirname, '../src/assets/images/details/character-icons/')
const run = async () => {
  try {
    const files = await readdir(path)
    const newFiles = files.map(file => file.split(" ").join("-"))
    files.forEach((filePath, i) => {
      fs.rename(path + '/' + filePath, path + '/' + newFiles[i], () => {
        console.log('success!')
      })
    })
  } catch(err) {
    console.log(err)
  }
}

run()
