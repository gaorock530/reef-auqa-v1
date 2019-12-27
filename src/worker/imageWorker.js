// importScripts('/lib/jimp.min.js')
import Jimp from 'jimp'


export default function (e) {
  console.log('worker')
  console.log(e)
  let photo, reader
  onmessage = e => { // eslint-disable-line no-unused-vars
    // THIS IS THE PLACE YOU EMBED YOUR CODE THAT WILL RUN IN BACKGROUND        
    // console.log('Worker: Message received from main script')
    photo = e.data
  
    reader = new FileReader()
    reader.onloadend = async () => {
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
    }
    
    reader.readAsArrayBuffer(photo)
  }
}
