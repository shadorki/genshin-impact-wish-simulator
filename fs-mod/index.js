const fs = require('fs')
const util = require('util')
const p = require('path');
const readdir = util.promisify(fs.readdir);
// const path = p.join(__dirname, '../src/data/details.json')
// const weapons = require('../src/data/weapons.json')
// const characters = require('../src/data/characters.json')

const run = async () => {
  try {
    // const items = [...weapons, ...characters]
    // let itemList = `

    // `
    // itemList = itemList.split(/\r?\n/).map(s => s.trim()).filter(s => s !== "Character" && s !== "Weapon")
    // itemList.pop()
    // itemList.shift()
    // const newDetails = []
    // itemList.forEach(item => {
    //   newDetails.push(items.find(i => i.name === item))
    // })
    let epitome = require('../src/data/wanderlust-invocation.json')
    const path = p.join(__dirname, '../src/data/wanderlust-invocation.json')
    epitome.forEach(item => {
      if(item.hasOwnProperty('class')) {
        if(!item.hasOwnProperty('type')) {
          item.type = 'weapon'
        }
      }
    })
    // console.log(epitome.find(item => item.name === "Dragon's Bane"))
    fs.writeFileSync(path, JSON.stringify(epitome))
  } catch(err) {
    console.log(err)
  }
}

// run()

const validateImages = async () => {
  let farewell = require('../src/data/farewell-of-snezhnaya.json')
  let wanderlust = require('../src/data/wanderlust-invocation.json')
  let epitome = require('../src/data/epitome-invocation.json')
  const weaponPix = await readdir(p.join(__dirname, '../src/assets/images/weapons'))
  const characterPix = await readdir(p.join(__dirname, '../src/assets/images/characters'))
  const pics = [...weaponPix, ...characterPix]
  const arrs = [farewell, wanderlust, epitome]
  arrs.forEach((arr, i) => {
    arr.forEach(item => {
      if (!pics.some(pic => pic === item.src)) {
        console.log(`We are missing an image for ${item.name} from the banner in the ${i} position`)
      }
    })
  })
}

// validateImages()
