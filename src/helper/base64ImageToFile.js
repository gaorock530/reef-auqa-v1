import {Base64Binary} from './base64'
/**
 * 
 * @param {String[BASE64IMAGE]} base64String 
 */

export default function (base64String) {
  const partImage = base64String.split(',')[1]
  //data:image/png;base64
  const mimetype = base64String.split(',')[0].split(';')[0].slice(5)  // image/png
  
  const imageBuffer = Base64Binary.decodeArrayBuffer(partImage)
  const imageFile = new File([imageBuffer], `new.${mimetype.split('/')[1]}`, {
    type: mimetype,
  })

  return {
    file: imageFile,
    mimetype: mimetype,
    extension: mimetype.split('/')[1]
  }
}