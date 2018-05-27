const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync
const walk = require('powerwalker')
const sizeOf = require('image-size')

let manifest = {}
let images = []

const folder = 'gallery'
const out = 'site/assets/gallery/'

start()

async function start () {
  let files = await walk(folder, {
    filesonly: true,
  })

  manifest.lastupdated = Date.now()
  manifest.images = []

  for (var i = 0; i < files.length; i++) {
    if(path.extname(files[i]) == '.jpg' || path.extname(files[i]) == '.png' || path.extname(files[i]) == '.jpeg' || path.extname(files[i]) == '.gif ') {

      images.push(files[i])
      var dimensions = sizeOf(files[i])
      var b64 = placeholder(dimensions.width, dimensions.height)
      var entry = path.parse(files[i])

      manifest.images.push({
        "file": entry.base,
        "dimensions": [dimensions.width, dimensions.height],
        "b64": b64, 
        "notes": fs.readFileSync(path.join(folder, entry.name + '.txt'), 'utf8')
      })
    
    }
  }

  // console.log(images)
  // console.log(manifest)
  save()
}

function save () {
  // save manifest
  fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(manifest))

  // save images
  for (var i = 0; i < images.length; i++) {
    fs.copyFileSync(images[i], path.join(out, path.basename(images[i])))
  }
}

function placeholder (w, h) {
  // w = Math.round(w*0.1)
  // h = Math.round(h*0.1)

  const cmd = `echo 'data:image/gif;base64,'"$(convert -size ${w}x${h} xc:black gif:- | base64)"`
  return execSync(cmd).toString().trim()
}