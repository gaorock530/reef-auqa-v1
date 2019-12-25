export const measureDefaultOption = ['自定义尺寸', '自定义水体'] 
export const metrics = {
  volume: ['L', 'G us', 'G uk'],
  dose: ['ml', 'mg', 'g', 'O us', 'O uk'],
  length: ['mm', 'cm', 'inch', 'foot'],
  lengthText: ['mm', 'cm', 'in', 'ft']
}

export const convert = {
  // convert to Liters
  volumeToL: [1, 3.7854118, 4.5460919],
  // convert to Meters
  lengthToM: [0.001, 0.01, 0.0254, 0.3048]
}

export const isApple = /iPhone|iPod|iPad/.test(navigator.userAgent)
export const isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

export const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
export const WEEKDAYS_LONG = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
export const WEEKDAYS_SHORT = ['一', '二', '三', '四', '五', '六', '日']

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

  [{ 'header': [1, 2, 3, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'align': [] }],
  ['image'],  
  ['clean']                                         // remove formatting button
];

export const editConfigNormal = {
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: '编辑正文...',
  theme: 'snow',  // or 'bubble'
}

export const editConfig = {
  modules: {
    toolbar: false
  },
  readOnly: true,
  theme: 'snow'
}