importScripts('/lib/jimp.min.js')

let photo, reader

onmessage = e => { // eslint-disable-line no-unused-vars
  // THIS IS THE PLACE YOU EMBED YOUR CODE THAT WILL RUN IN BACKGROUND        
  // console.log('Worker: Message received from main script')
  photo = e.data
  reader = new FileReader()
  reader.addEventListener("loadend",async () => {
    // reader.result contains the contents of blob as a typed array
    const pic = await Jimp.read(reader.result)
    // console.log(pic)
    if (Math.max(pic.bitmap.height, pic.bitmap.width) > 1200) {
      if (pic.bitmap.width > pic.bitmap.height) {
        pic.resize(1200, Jimp.AUTO, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
      } else {
        pic.resize(Jimp.AUTO, 1200, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
      }
    }
    
    pic.quality(60)
    const newPic = await pic.getBase64Async(Jimp.MIME_JPEG) // getBufferAsync
    // const newFile = new Blob([newPic], {type: "image/jpeg"})
    postMessage(newPic)
    photo = undefined
    reader = undefined
  }, {once: true});
  reader.readAsArrayBuffer(photo)
}