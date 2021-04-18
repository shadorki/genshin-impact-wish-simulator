const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
let { previous, next } = require('minimist')(process.argv.slice(2));

const shouldSkipCapitalization = (s, i) => !!i && new Set(['in', 'the', 'and', 'of', 'for']).has(s)

const doesStillNeedReplacing = str => Object.values(previous).some(v => str.includes(v))

const formatBanners = banner => ({
  kebab: banner,
  display: banner.split('-').map((s, i) => shouldSkipCapitalization(s, i) ? s : s[0].toUpperCase() + (!!s[1] ? s.slice(1) : '')).join(' '),
  pascal: banner.split('-').map(s => s[0].toUpperCase() + (!!s[1] ? s.slice(1) : '')).join(''),
  camel: banner.split('-').map((s, i) => !i ? s : s[0].toUpperCase() + (!!s[1] ? s.slice(1) : '')).join('')
})

const replaceAllInstancesInFile = (filePath, previous, next) => {
  const p = path.join(__dirname, filePath)
  let file = fs.readFileSync(p).toString()
  for (const key in previous) {
    file = file.replace(previous[key], next[key])
  }
  fs.writeFileSync(p, file)
}

const appendAllInstancesInFile = (file, previous, next) => {
  const newFile = []
  file.forEach((a, i) => {
    newFile.push(a)
    if (doesStillNeedReplacing(a)) {
      let str = a
      while (doesStillNeedReplacing(str)) {
        for (const key in previous) {
          str = str.replace(previous[key], next[key])
        }
      }
      newFile.push(str)
    }
  })
  return newFile
}


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
        replaceAllInstancesInFile(filePath, previous, next)
      })

      // Create a new model for banner
      const modelPath = path.join(__dirname, '../src/models/')
      const oldModelPath = modelPath + previous.kebab + '.js'
      const newModelPath = modelPath + next.kebab + '.js'

      let modelFile = fs.readFileSync(oldModelPath).toString()
      modelFile = modelFile.replace(previous.kebab, next.kebab)
      modelFile = modelFile.replace(previous.pascal, next.pascal)

      fs.writeFileSync(newModelPath, modelFile)

      // Update the apps page
      const appPath = path.join(__dirname, '../src/components/app.jsx')
      const appFile = fs.readFileSync(appPath).toString().split('\n')
      // Change selected character event wish
      console.log('selectedCharacterEventWish: ' + previous.kebab + ',')
      const selectedCharacterEventWishIndex = appFile.findIndex(s => s.includes("selectedCharacterEventWish: '" + previous.kebab + "',"))
      if (selectedCharacterEventWishIndex === -1) {
        console.log('Appfile has messed up selected character event wish, or it does not currently match the previous banner')
        process.exit(1)
      }
      appFile[selectedCharacterEventWishIndex] = appFile[selectedCharacterEventWishIndex].replace(previous.kebab, next.kebab)

      // Append the changes to whereever it's needed
      const newAppfile = appendAllInstancesInFile(appFile, previous, next)

      fs.writeFileSync(appPath, newAppfile.join('\n'))

      //Update the settings page

      const settingsPath = path.join(__dirname, '../src/components/settings.jsx')
      const settingsFile = fs.readFileSync(settingsPath).toString().split('\n')
      const newSettingsfile = appendAllInstancesInFile(settingsFile, previous, next)
      fs.writeFileSync(settingsPath, newSettingsfile.join('\n'))

      // Update the details page
      const detailsPath = path.join(__dirname, '../src/components/details.jsx')
      const detailsFile = fs.readFileSync(detailsPath).toString().split('\n')
      const newDetailsfile = appendAllInstancesInFile(detailsFile, previous, next)
      fs.writeFileSync(detailsPath, newDetailsfile.join('\n'))

      // Create a start details page
      const singleDetailsPath = path.join(__dirname, '../src/components/' + previous.kebab + '-details.jsx')
      const newSingleDetailsPath = path.join(__dirname, '../src/components/' + next.kebab + '-details.jsx')
      const singleDetailsFile = fs.readFileSync(singleDetailsPath)
                                  .toString()
                                  .split('\n')
                                  .map(line => {
                                    while (doesStillNeedReplacing(line)) {
                                      for (const key in previous) {
                                        line = line.replace(previous[key], next[key])
                                      }
                                    }
                                    return line
                                  })
      const [ previousKey, nextKey ] = [ previous.kebab, next.kebab ].map(s => s.split('-')[0])
      const newSingleDetailsFile = singleDetailsFile.map(line => line.replace(previousKey, nextKey))
      fs.writeFileSync(newSingleDetailsPath, newSingleDetailsFile.join('\n'))

    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })()
