// Script for resizing the player icons to the 64 x 64 size
// These icons will be in src/assets/images/characters/thumbnails

function setView(document) {
    app.activeDocument = document
}
app.bringToFront()
var pathName = 'C:/Users/user/git/genshin-impact-wish-simulator/src/assets/images/characters/thumbnails/'
for(var i = 0; i < app.documents.length; i++) {
    var d = app.documents[i]
    // The images from genshin are going to be 106 by 106
    if (d.width !== 106 || d.height !== 106) continue;
    setView(d)
    d.resizeImage('64px', '64px')
    var fileName = prompt('Enter character name', '')
    d.saveAs(new File(pathName + fileName + '.png'), new PNGSaveOptions());
}