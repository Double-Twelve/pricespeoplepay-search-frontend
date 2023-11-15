const convertToSoldDateFormat = (date: string) => {
  const dateObject = new Date(date)
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = monthNames[dateObject.getUTCMonth()]
  const year = dateObject.getUTCFullYear()
  return `${month} ${year}`
}

const convertToMysqlDateFormat = (date: Date) => {
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}

export { convertToMysqlDateFormat, convertToSoldDateFormat }
