const fs = require('fs')
const util = require('util')
const p = require('path');
const readdir = util.promisify(fs.readdir);
const path = p.join(__dirname, '../src/assets/images/weapons/')
const epitomeWeapons = require('../src/data/epitome-invocation.json').map(weapon => weapon.src)
const run = async () => {
  try {
    const files = await readdir(path)
    console.log(epitomeWeapons)
  } catch(err) {
    console.log(err)
  }
}

run()
