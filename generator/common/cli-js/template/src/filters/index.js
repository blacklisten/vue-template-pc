import { formatDateFuc } from '../../utils/index'

const formatDate = (date, pattern) => {
  return date ? formatDateFuc(new Date(date), pattern) : '/'
}

export default {
  formatDate
}