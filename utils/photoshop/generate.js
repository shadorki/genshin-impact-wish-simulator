// Script for getting the banners and icons from the screenshots

function setView(document) {
    app.activeDocument = document
}
function getBannerFromScreenShot(doc) {
    var bannerPath = 'C:/Users/user/git/genshin-impact-wish-simulator/src/assets/images/banners/'
    var bannerWidth = 1296
    var bannerHeight = 672
    if (doc.width.value !== 1920 && doc.height.value !== 1080) {
        return
    }
    var layer = doc.activeLayer
    layer.duplicate()
    layer.remove()
    // The images from genshin are going to be 106 by 106
    // create variables
    var bounds, left, top, right, bottom;

    // get the current height and width as a numeric value
    // (otherwise you'll get '1000 px' as doc.<dimension>)
    var height = doc.height.value + 24;
    var width = doc.width.value;
    // offset the left side
    left = (width - bannerWidth) / 2;
    top = (height - bannerHeight) / 2;
    // and the right
    right = (width + bannerWidth) / 2;;
    bottom = (height + bannerHeight) / 2;

    bounds = [left, top, right, bottom];
    doc.crop(bounds);
    height = doc.height.value;
    width = doc.width.value;
    // selects bottom left corner to delete
    doc.selection.select([
        [0, height - 4],
        [1, height - 4],
        [4, height],
        [0, height],
    ])
    doc.selection.clear()
    // selects bottom right corner to delete
    doc.selection.select([
        [width, height - 4],
        [width - 1, height - 4],
        [width - 4, height],
        [width, height],
    ])
    doc.selection.clear()
    // selects top right corner to delete
    doc.selection.select([
        [width - 4, 0],
        [width - 4, 1],
        [width, 4],
        [width, 0],
    ])
    doc.selection.clear()
    var fileName = prompt('Enter banner name', doc.name)
    doc.saveAs(new File(bannerPath + fileName), new PNGSaveOptions());
}

function getIconFromWeaponBanner(doc) {
    var iconWidth = 157
    var iconHeight = 93
    if (doc.width.value !== 1920 && doc.height.value !== 1080) {
        return
    }
    var layer = doc.activeLayer
    layer.duplicate()
    layer.remove()
    // The images from genshin are going to be 106 by 106
    // create variables
    var bounds, left, top, right, bottom;

    left = 687;
    top = 0;
    // and the right
    right = 687 + iconWidth;
    bottom = iconHeight;
    bounds = [left, top, right, bottom];
    doc.crop(bounds);
    height = doc.height.value;
    width = doc.width.value;
    // selects bottom left corner to delete
    doc.selection.select([
        [0, height - 3],
        [1, height - 3],
        [3, height],
        [0, height],
    ])
    doc.selection.clear()
    // selects bottom right corner to delete
    doc.selection.select([
        [width, height - 3],
        [width - 1, height - 3],
        [width - 3, height],
        [width, height],
    ])
    doc.selection.clear()
    doc.selection.selectAll()
    doc.selection.copy()
    var iconName = prompt('Enter icon name', '')
    var iconDoc = app.documents.add(180, 90, 72, iconName)
    layer = iconDoc.activeLayer
    iconDoc.selection.selectAll()
    iconDoc.paste()
    layer.remove()
}
function getIconFromCharacterBanner(doc) {
    var iconWidth = 157
    var iconHeight = 93
    if (doc.width.value !== 1920 && doc.height.value !== 1080) {
        return
    }
    var layer = doc.activeLayer
    layer.duplicate()
    layer.remove()
    // The images from genshin are going to be 106 by 106
    // create variables
    var bounds, left, top, right, bottom;

    left = 881;
    top = 0;
    // and the right
    right = 881 + iconWidth;
    bottom = iconHeight;
    bounds = [left, top, right, bottom];
    doc.crop(bounds);
    height = doc.height.value;
    width = doc.width.value;
    // selects bottom left corner to delete
    doc.selection.select([
        [0, height - 3],
        [1, height - 3],
        [3, height],
        [0, height],
    ])
    doc.selection.clear()
    // selects bottom right corner to delete
    doc.selection.select([
        [width, height - 3],
        [width - 1, height - 3],
        [width - 3, height],
        [width, height],
    ])
    doc.selection.clear()
    doc.selection.selectAll()
    doc.selection.copy()
    var iconName = prompt('Enter icon name', '')
    var iconDoc = app.documents.add(180, 90, 72, iconName)
    layer = iconDoc.activeLayer
    iconDoc.selection.selectAll()
    iconDoc.paste()
    layer.remove()
}
function getSelectedIconFromWeaponBanner(doc) {
    var iconWidth = 174
    var iconHeight = 96
    if (doc.width.value !== 1920 && doc.height.value !== 1080) {
        return
    }
    var layer = doc.activeLayer
    layer.duplicate()
    layer.remove()
    // The images from genshin are going to be 106 by 106
    // create variables
    var bounds, left, top, right, bottom;

    left = 873;
    top = 0;
    // and the right
    right = 873 + iconWidth;
    bottom = iconHeight;
    bounds = [left, top, right, bottom];
    doc.crop(bounds);
    height = doc.height.value;
    width = doc.width.value;
    // selects bottom left corner to delete
    doc.selection.select([
        [0, height - 3],
        [1, height - 3],
        [3, height],
        [0, height],
    ])
    doc.selection.clear()
    // selects bottom right corner to delete
    doc.selection.select([
        [width, height - 3],
        [width - 1, height - 3],
        [width - 3, height],
        [width, height],
    ])
    doc.selection.clear()

    doc.selection.selectAll()
    doc.selection.copy()
    var iconName = prompt('Enter icon name', '')
    var iconDoc = app.documents.add(180, 90, 72, iconName)
    layer = iconDoc.activeLayer
    iconDoc.selection.selectAll()
    iconDoc.paste()
    layer.remove()
}
function getSelectedIconFromCharacterBanner(doc) {
    var iconWidth = 174
    var iconHeight = 96
    if (doc.width.value !== 1920 && doc.height.value !== 1080) {
        return
    }
    var layer = doc.activeLayer
    layer.duplicate()
    layer.remove()
    // The images from genshin are going to be 106 by 106
    // create variables
    var bounds, left, top, right, bottom;

    left = 678;
    top = 0;
    // and the right
    right = 678 + iconWidth;
    bottom = iconHeight;
    bounds = [left, top, right, bottom];
    doc.crop(bounds);
    height = doc.height.value;
    width = doc.width.value;
    // selects bottom left corner to delete
    doc.selection.select([
        [0, height - 3],
        [1, height - 3],
        [3, height],
        [0, height],
    ])
    doc.selection.clear()
    // selects bottom right corner to delete
    doc.selection.select([
        [width, height - 3],
        [width - 1, height - 3],
        [width - 3, height],
        [width, height],
    ])
    doc.selection.clear()

    doc.selection.selectAll()
    doc.selection.copy()
    var iconName = prompt('Enter icon name', '')
    var iconDoc = app.documents.add(180, 90, 72, iconName)
    layer = iconDoc.activeLayer
    iconDoc.selection.selectAll()
    iconDoc.paste()
    layer.remove()
}


app.bringToFront()

// get icons
for (var i = 0; i < app.documents.length; i++) {
    var doc = app.documents[i]
    if (doc.width.value !== 1920 && doc.height.value !== 1080) {
        continue
    }
    setView(doc)
    var isWeaponBanner = prompt('Is this the weapon banner? Answer yes or no', 'yes') === 'yes'
    var startingState = doc.activeHistoryState
    if (isWeaponBanner) {
        getIconFromWeaponBanner(doc)
        setView(doc)
        doc.activeHistoryState = startingState
        getSelectedIconFromWeaponBanner(doc)
    } else {
        getIconFromCharacterBanner(doc)
        setView(doc)
        doc.activeHistoryState = startingState
        getSelectedIconFromCharacterBanner(doc)
    }
    setView(doc)
    doc.activeHistoryState = startingState
}

// get banners
for (var i = 0; i < app.documents.length; i++) {
    var doc = app.documents[i]
    if (doc.width.value !== 1920 && doc.height.value !== 1080) {
        continue
    }
    setView(doc)
    getBannerFromScreenShot(doc)
}