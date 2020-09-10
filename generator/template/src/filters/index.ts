import { formatDateFuc } from '../../utils/index'

const formatDate = (date: string, pattern: string) => {
  return date ? formatDateFuc(new Date(date), pattern) : '/'
}

export default {
  formatDate
}