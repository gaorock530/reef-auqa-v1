
import word from './wordcounter';

export const map = (value, in_min, in_max, out_min, out_max) => (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
export const range = (lower, upper) => Math.floor(Math.random() * (upper - lower)) + lower


export const checkNick = (v) => {
  v = v.trim();
  if (v.match(/[^\w^\u4e00-\u9fa5^'^\s]+/g) || word(v, true, true) > 20) return false;
  return v; 
}
export const checkPass = (v) => {
  let secureLevel = 0;
  // Minimum eight characters, at least one letter and one number:
  if (v.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,128}$/)) secureLevel = 1;
  // Minimum eight characters, at least one letter, one number and one special character
  if (v.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/) || 
  // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
      v.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,128}$/)) secureLevel = 2;
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte
  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/
  if (v.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,128}$/) ||
  // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character
      v.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[A-Za-z\d\W]{8,128}$/)) secureLevel = 3;
  return secureLevel;
}
export const dataURLToBlob = (dataURL) => {
  var BASE64_MARKER = ';base64,';
  var parts;
  var contentType;
  var raw;

  if (dataURL.indexOf(BASE64_MARKER) === -1) {
    parts = dataURL.split(',');
    contentType = parts[0].split(':')[1];
    raw = decodeURIComponent(parts[1]);

    return new Blob([raw], {type: contentType});
  }

  parts = dataURL.split(BASE64_MARKER);
  contentType = parts[0].split(':')[1];
  raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
}

export const enterFS = (element) => {
  if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }else {
    element.webkitEnterFullScreen()
  }
}

export const exitFS = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } 
}


