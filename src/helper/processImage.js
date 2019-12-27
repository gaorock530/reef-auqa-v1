import base64ToFile from './base64ImageToFile'
import Jimp from 'jimp'

const workerInstance = new Worker('/photoWorker.js')

export default async function (file) {
  let image;

  // base64 Image
  if (typeof file === 'string') {
    image = base64ToFile(file).file
  // file
  } else if (file instanceof File) {
    image = file
  }

  return new Promise((resolve, reject) => {
    if (window.Worker) {
      workerInstance.postMessage(image)
      workerInstance.onmessage = e => {
        resolve(e.data)
      }
    } else {
      const reader = new FileReader()
      reader.onloadend = async () => {
        // reader.result contains the contents of blob as a typed array
        const pic = await Jimp.read(reader.result)
        pic.resize(1200, Jimp.AUTO, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
        pic.quality(50)
        const newPic = await pic.getBufferAsync(Jimp.MIME_JPEG)
        const newFile = new Blob([newPic], {type: "image/jpeg"})
        resolve(newFile)
        // console.log(window.URL.createObjectURL(newFile))
      }
      reader.readAsArrayBuffer(image)
    }
  })
}