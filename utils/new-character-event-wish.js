const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
let { previous, next } = require('minimist')(process.argv.slice(2));

const shouldSkipCapitalization = (s, i) => !!i && new Set(['in', 'the', 'and', 'of', 'for']).has(s)

const formatBanners = banner => ({
  kebab: banner,
  display: banner.split('-').map((s, i) => shouldSkipCapitalization(s, i) ? s : s[0].toUpperCase() + (!!s[1] ? s.slice(1) : '')).join(' '),
  pascal: banner.split('-').map(s => s[0].toUpperCase() + (!!s[1] ? s.slice(1) : '')).join(''),
  camel: banner.split('-').map((s, i) => !i ? s : s[0].toUpperCase() + (!!s[1] ? s.slice(1) : '')).join('')
})


  ; (async () => {
    try {
      if ([previous, next].some(v => !v)) {
        console.log('Provide the previous and next arguments, like so:')
        console.log('--previous=ballad-in-goblets-2')
        console.log('--next=farewell-of-snezhnaya-2')
        process.exit(1)
      }

      if ([previous, next].some(v => !v.includes('-'))) {
        console.log('Previous and next need to be kebab case')
        process.exit(1)
      }

      previous = formatBanners(previous)
      next = formatBanners(next)
      console.log(previous)
      console.log(next)

      // Update integration tests
      const testFiles = await readdir(path.join(__dirname, '../cypress/integration/'))

      testFiles.forEach(f => {
        const filePath = '../cypress/integration/' + f
        let test = fs.readFileSync(path.join(__dirname, filePath)).toString()
        for( const key in previous ) {
          test = test.replace(previous[key], next[key])
        }
        fs.writeFileSync(filePath, test)
      })

      console.log(testFiles)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })()
