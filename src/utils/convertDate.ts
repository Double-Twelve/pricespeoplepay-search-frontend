import { format } from 'date-fns'

const convertToSoldDateFormat = (date: string) => {
  const result = format(new Date(date), 'MMM yyyy')
  return result
}

const convertToMysqlDateFormat = (date: Date) => {
  const result = format(date, 'yyyy-MM-dd')
  return result
}

const convertToCarBasicInformationFormat = (date: string) => {
  const result = format(new Date(date), 'EEEE, MMMM d, yyyy')
  return result
}

export {
  convertToCarBasicInformationFormat,
  convertToMysqlDateFormat,
  convertToSoldDateFormat,
}
