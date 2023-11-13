const convertDate = (date: string) => {
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

export default convertDate
