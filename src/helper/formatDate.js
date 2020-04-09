let lastDate;

export default (date) => {
  const days = ['一', '二', '三', '四', '五', '六', '日']
  const place = (str) => String(str).length < 2? '0'+str:str

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const dd = days[date.getDay()]

  const hour = place(date.getHours())
  const min = place(date.getMinutes())
  const sec = place(date.getSeconds())

  let format
  if (lastDate && (year === lastDate.getFullYear() && month === lastDate.getMonth() && day === lastDate.getDate())) {
    format = `${year}-${place(month+1)}-${place(day)} ${hour}:${min}:${sec} 星期${dd}`
  } else {
    format = `${hour}:${min}:${sec}`
  }

  lastDate = date

  return format
}