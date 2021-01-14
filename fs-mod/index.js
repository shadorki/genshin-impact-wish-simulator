const fs = require('fs')
const util = require('util')
const p = require('path');
const readdir = util.promisify(fs.readdir);
// const path = p.join(__dirname, '../src/data/details.json')
const weapons = require('../src/data/weapons.json')
const characters = require('../src/data/characters.json')

const run = async () => {
  try {
    const items = [...weapons, ...characters]
    let itemList = `

`
    itemList = itemList.split(/\r?\n/).map(s => s.trim()).filter(s => s !== "Character" && s !== "Weapon")
    itemList.pop()
    itemList.shift()
    let newDetails = []
    itemList.forEach(item => {
      newDetails.push(items.find(i => i.name === item))
    })
    newDetails = newDetails.map(item => {
      if(!item) return null
      if(item.hasOwnProperty('class')) {
        if(!item.hasOwnProperty('type')) {
          item.type = 'weapon'
        }
      }
      if(!item.src) {
        item.src = item.name + '.png'
      } else {
        if(item.src.includes("'")) {
          item.src = item.src.replace("'", "")
        }
      }
      return item
    })
    // let epitome = require('../src/data/wanderlust-invocation.json')
    const path = p.join(__dirname, '../src/data/epitome-invocation.json')
    // epitome.forEach(item => {
    //   if(item.hasOwnProperty('class')) {
    //     if(!item.hasOwnProperty('type')) {
    //       item.type = 'weapon'
    //     }
    //   }
    // })
    // console.log(epitome.find(item => item.name === "Dragon's Bane"))
    fs.writeFileSync(path, JSON.stringify(newDetails))
    console.log(newDetails)
  } catch(err) {
    console.log(err)
  }
}

// run()

const validateImages = async () => {
  let adrift = require('../src/data/adrift-in-the-harbor.json')
  let wanderlust = require('../src/data/wanderlust-invocation.json')
  let epitome = require('../src/data/epitome-invocation.json')
  const weaponPix = await readdir(p.join(__dirname, '../src/assets/images/weapons'))
  const characterPix = await readdir(p.join(__dirname, '../src/assets/images/characters'))
  const pics = [...weaponPix, ...characterPix]
  const arrs = [adrift, wanderlust, epitome]
  arrs.forEach((arr, i) => {
    arr.forEach(item => {
      if (!pics.some(pic => pic === item.src)) {
        console.log(`We are missing an image for ${item.name} from the banner in the ${i} position`)
      }
    })
  })
}

validateImages()
