const fs = require('fs')
const util = require('util')

const readdir = util.promisify(fs.readdir);
const path = '../src/assets/images/weapons'
const run = async () => {
  try {
    const files = await readdir(path)
    const newFiles = files.map(file => file.replace("Weapon_", "").split("_").join("-").toLowerCase())
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
